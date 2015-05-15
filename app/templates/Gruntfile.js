module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.initConfig({

        watch: {
            scripts: {
                files  : ['./lib/**/*.js', './test/**/*.js'],
                tasks  : ['mocha_istanbul:coverage'],
                options: {
                    debounceDelay: 250
                }
            }
        },

        mocha_istanbul: {
            coverage : {
                src    : 'test',
                options: {
                    mask: '*.specs.js'
                }
            },
            coveralls: {
                src: ['test'],
                options: {
                    coverage:true,
                    check: {
                        lines: 60,
                        statements: 60
                    },
                    root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
                    reportFormats: ['cobertura','lcovonly', 'html']
                }
            }
        }

    });

    grunt.event.on('coverage', function(lcov, done){
        require('coveralls').handleInput(lcov, function(err){
            if (err) {
                return done(err);
            }
            done();
        });
    });

    grunt.registerTask('test', ['mocha_istanbul:coveralls']);

};
