'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    //todo: ask for modelname, fields, port, projectname, git-url, dbcollectionname, dbip

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the sensational ' + chalk.red('HapiRestGenerator') + ' generator!'
        ));

        var prompts = [{
            type: 'confirm',
            name: 'someOption',
            message: 'Would you like to enable this option?',
            default: true
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;

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
