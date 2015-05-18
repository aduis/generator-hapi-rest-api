'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var plural = require('plural');
var changeCase = require('change-case');
var schemas = require('./schemas');
var hoek = require('hoek');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.option('resource');
        this.option('fields');
        this.option('query');
        this.option('port');
        this.option('project');
        this.option('dbcollection');
        this.option('dbinstance');
        this.option('embedbooking');
        this.option('userabbitmq');
        this.option('rabbitinstance');
        this.option('giturl');
        this.option('coveralls');
        this.option('coverallskey');

    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the sensational ' + chalk.red('HapiRestAPI') + ' generator!'
        ));

        var prompts = [];

        if (!this.options.resource)
            prompts.push({
                type: 'input',
                name: 'resource',
                message: 'Would is the name of your resource?',
                default: 'address'
            });

        if (!this.options.fields)
            prompts.push({
                type: 'input',
                name: 'fields',
                message: 'What are the fields of the resource?',
                default: 'street:string,street_number:number,postcode:number,city:string,is_deleted:bool'
            });

        if (!this.options.query)
            prompts.push({
                type: 'input',
                name: 'query',
                message: 'What are additional query parameters for your get route?',
                default: 'street:string,street_number:number,postcode:number,city:string,is_deleted:bool'
            });

        if (!this.options.links)
            prompts.push({
                type: 'input',
                name: 'links',
                message: 'What links do you want to be included into hal links section?',
                default: 'hotel:/v1/hotels/:_hotel,client:/v1/clients/:_client'
            });

        if (!this.options.port)
            prompts.push({
                type: 'input',
                name: 'port',
                message: 'On what port do you want this api to listen?',
                default: 8500
            });

        if (!this.options.project)
            prompts.push({
                type: 'input',
                name: 'project',
                message: 'What is the name of your project?',
                default: 'address_rest_api'
            });

        if (!this.options.dbcollection)
            prompts.push({
                type: 'input',
                name: 'dbcollection',
                message: 'What is the name of the db collection?',
                default: 'addresses'
            });

        if (!this.options.dbinstance)
            prompts.push({
                type: 'input',
                name: 'dbinstance',
                message: 'What is the url of your db instance?',
                default: 'localhost:27017'
            });

        if (this.options.userabbitmq && !this.options.rabbitinstance)
            prompts.push({
                type: 'input',
                name: 'rabbitinstance',
                message: 'What is the url of your rabbitmq instance?',
                default: 'localhost'
            });

        if (!this.options.giturl)
            prompts.push({
                type: 'input',
                name: 'giturl',
                message: 'What is the git url of this project?',
                default: 'git@github.com:<github_user>/<project_name>'
            });

        if (this.options.coveralls && !this.options.coverallskey)
            prompts.push({
                type: 'input',
                name: 'coverallskey',
                message: 'Do you have a coveralls key?'
            });

        this.prompt(prompts, function (props) {
            var me = this;
            me.props = hoek.merge(props, me.options);

            me.props.resource = changeCase.camelCase(props.resource);
            me.props.Resource = changeCase.pascalCase(props.resource);

            me.props.resources = plural(me.props.resource);
            me.props.Resources = plural(me.props.Resource);

            if (props.fields && typeof props.fields === "string") {
                var splittedFields = props.fields.split(',');

                me.props.fields = [];
                splittedFields.forEach(function (field) {
                    var splitted = field.split(':');
                    me.props.fields.push({
                        "name": splitted[0],
                        "type": splitted[1],
                        "mongoose": schemas.mongoose[splitted[1]],
                        "joi": schemas.joi[splitted[1]],
                        "sample": schemas.sample[splitted[1]]
                    });
                });
            }else {
                me.props.fields = [];
            }

            if (props.query && typeof props.query === "string") {
                var splittedQuery = props.query.split(',');

                me.props.query = [];
                splittedQuery.forEach(function (query) {
                    var splitted = query.split(':');
                    me.props.query.push({
                        "name": splitted[0],
                        "type": splitted[1],
                        "joi": schemas.joi[splitted[1]],
                        "sample": schemas.sample[splitted[1]]
                    });
                });
            }else{
                me.props.query = [];
            }

            if (props.links && typeof props.links === "string") {
                var splittedLinks = props.links.split(',');

                me.props.links = [];
                splittedLinks.forEach(function (link) {
                    var splitted = link.split(':');
                    me.props.links.push({
                        "name": splitted[0],
                        "link": splitted[1],
                        "property": splitted[2]
                    });
                });
            }else{
                me.props.links = [];
            }

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('Dockerfile'),
                this.destinationPath('Dockerfile'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('.coveralls.yml'),
                this.destinationPath('.coveralls.yml'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('.travis.yml'),
                this.destinationPath('.travis.yml'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('Gruntfile.js'),
                this.destinationPath('Gruntfile.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('index.js'),
                this.destinationPath('index.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/lib/index.js'),
                this.destinationPath('/lib/index.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/lib/v1/index.js'),
                this.destinationPath('/lib/v1/index.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/config/config.js'),
                this.destinationPath('/config/config.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/lib/v1/schemas/modelSchema.js'),
                this.destinationPath('/lib/v1/schemas/' + this.props.resource + 'Schema.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/lib/v1/handlers/deleteModelHandler.js'),
                this.destinationPath('/lib/v1/handlers/delete' + this.props.Resource + 'Handler.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/lib/v1/handlers/getModelHandler.js'),
                this.destinationPath('/lib/v1/handlers/get' + this.props.Resource + 'Handler.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/lib/v1/handlers/postModelHandler.js'),
                this.destinationPath('/lib/v1/handlers/post' + this.props.Resource + 'Handler.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/lib/v1/handlers/putModelHandler.js'),
                this.destinationPath('/lib/v1/handlers/put' + this.props.Resource + 'Handler.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/lib/v1/handlers/pingHandler.js'),
                this.destinationPath('/lib/v1/handlers/pingHandler.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/lib/v1/models/modelModel.js'),
                this.destinationPath('/lib/v1/models/' + this.props.resource + 'Model.js'),
                this.props);

            this.fs.copyTpl(
                this.templatePath('/test/getModelHandler.specs.js'),
                this.destinationPath('/test/get' + this.props.Resource + 'Handler.specs.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/test/postModelHandler.specs.js'),
                this.destinationPath('/test/post' + this.props.Resource + 'Handler.specs.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/test/putModelHandler.specs.js'),
                this.destinationPath('/test/put' + this.props.Resource + 'Handler.specs.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/test/deleteModelHandler.specs.js'),
                this.destinationPath('/test/delete' + this.props.Resource + 'Handler.specs.js'),
                this.props);
            this.fs.copyTpl(
                this.templatePath('/test/pingHandler.specs.js'),
                this.destinationPath('/test/pingHandler.specs.js'),
                this.props);
        },

        projectfiles: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
        }
    },

    install: function () {
        this.installDependencies({bower: false});
    }
});
