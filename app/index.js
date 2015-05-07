'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case')

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the sensational ' + chalk.red('HapiRestGenerator') + ' generator!'
            ));

        var prompts = [
            {
                type: 'input',
                name: 'resource',
                message: 'Would is the name of your resource?',
                default: 'myModel'
            },
            {
                type: 'input',
                name: 'fields',
                message: 'What are the fields of the resource?',
                default: 'name:string,value:number,isDeleted:bool'
            },
            {
                type: 'input',
                name: 'port',
                message: 'On what port do you want this api to listen?',
                default: 8500
            },
            {
                type: 'input',
                name: 'project',
                message: 'What is the name of your project?',
                default: 'my_model_rest_api'
            },
            {
                type: 'input',
                name: 'db_collection',
                message: 'What is the name of the db collection?',
                default: 'my_model_collection'
            },
            {
                type: 'input',
                name: 'db_instance',
                message: 'What is the url of your db instance?',
                default: 'localhost:27017'
            },
            {
                type: 'input',
                name: 'giturl',
                message: 'What is the git url of this project?',
                default: 'git@github.com:<github_user>/<project_name>'
            },
        ];

        this.prompt(prompts, function (props) {
            this.props = props;

            done();
        }.bind(this));
    },

    //todo: replace placeholders

    writing: {
        app: function () {
            this.fs.copy(
                this.templatePath('_package.json'),
                this.destinationPath('package.json')
                );
            this.fs.copy(
                this.templatePath('index.js'),
                this.destinationPath('index.js')
                );
            this.fs.copy(
                this.templatePath('/lib/index.js'),
                this.destinationPath('/lib/index.js')
                );
            this.fs.copy(
                this.templatePath('/lib/v1/index.js'),
                this.destinationPath('/lib/v1/index.js')
                );
            this.fs.copy(
                this.templatePath('/lib/v1/schemas/modelSchema.js'),
                this.destinationPath('/lib/v1/schemas/' + changeCase.camelCase(this.props.resource) + 'Schema.js')
                );
            this.fs.copy(
                this.templatePath('/lib/v1/handlers/deleteModelHandler.js'),
                this.destinationPath('/lib/v1/handlers/delete' + changeCase.pascalCase(this.props.resource) + 'Handler.js')
                );
            this.fs.copy(
                this.templatePath('/lib/v1/handlers/getModelHandler.js'),
                this.destinationPath('/lib/v1/handlers/get' + changeCase.pascalCase(this.props.resource) + 'Handler.js')
                );
            this.fs.copy(
                this.templatePath('/lib/v1/handlers/postModelHandler.js'),
                this.destinationPath('/lib/v1/handlers/post' + changeCase.pascalCase(this.props.resource) + 'Handler.js')
                );
            this.fs.copy(
                this.templatePath('/lib/v1/handlers/putModelHandler.js'),
                this.destinationPath('/lib/v1/handlers/put' + changeCase.pascalCase(this.props.resource) + 'Handler.js')
                );
            this.fs.copy(
                this.templatePath('/lib/v1/handlers/pingHandler.js'),
                this.destinationPath('/lib/v1/handlers/pingHandler.js')
                );
            this.fs.copy(
                this.templatePath('/lib/v1/models/modelModel.js'),
                this.destinationPath('/lib/v1/models/' + changeCase.camelCase(this.props.resource) + 'Model.js')
                );
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
        this.installDependencies();
    }
});
