'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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
                default: 'my_model'
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

    //todo: add all files and replace placeholders

    writing: {
        app: function () {
            this.fs.copy(
                this.templatePath('_package.json'),
                this.destinationPath('package.json')
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
