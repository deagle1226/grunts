module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            js: 'js/app/**/*.js',
            sass: 'style/sass',
            css: 'style/css'
        },
        concurrent: {
            watch: ['watch', 'compass:dev'],
            build: ['build-js', 'build-css', 'imagemin:build']
        },
        watch: {
            files: ['gruntfile.js', 'dev/<%= paths.js %>', '!dev/js/app/bundle.js'],
            tasks: ['jshint', 'browserify:dev']
        },
        jshint: {
            options: {
                ignores: ['dev/js/app/bundle.js'],
                globals: {
                    jQuery: true
                }
            },
            all: ['gruntfile.js', 'dev/<%= paths.js %>']
        },
        compass: {
            build: {
                options: {
                    sassDir: 'build/<%= paths.sass %>',
                    cssDir: 'build/<%= paths.css %',
                    environment: 'production',
                    outputStyle: 'compressed'
                }
            },
            dev: {
                options: {
                    sassDir: '<%= paths.sass %>',
                    cssDir: '<%= paths.css %>',
                    environment: 'development',
                    outputStyle: 'expanded',
                    watch: true
                }
            }
        },
        cssmin: {
            build: {
                expand: true,
                cwd: 'build/<%= paths.css %>/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/<%= paths.css %>/',
                ext: '.min.css'
            }
        },
        imagemin: {
            build: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'build/img/',
                    src: ['**/*.jpg'],
                    dest: 'build/img/',
                    ext: '.jpg'
                }, {
                    expand: true,
                    cwd: 'build/img/',
                    src: ['**/*.png'],
                    dest: 'build/img/',
                    ext: '.png'
                }]
            }
        },
        uglify: {
            options: {
                report: 'gzip'
            },
            build: {
                files: {
                    'build/js/app/bundle.min.js': 'build/js/app/bundle.js'
                }
                // [{
                //     expand: true,
                //     cwd: 'dev/<%= paths.js %>',
                //     src: '**/*.js',
                //     dest: 'build/<%= paths.js %>'
                // }]
            }
        },
        browserify: {

            build: {
                files: {
                    'build/js/app/bundle.js': 'build/js/app/main.js'
                }
            },
            dev: {
                files: {
                    'dev/js/app/bundle.js': 'dev/js/app/main.js'
                }
            },
            test: {
                files: {
                    'test/js/app/test_test.js': 'test/js/app/testTest.js'
                }
            }
        },
        clean: [
            'build/**'
        ],
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['**'],
                    dest: 'build/'
                }]
            }
        },
        validation: {
            options: {
                reset: true,
                stoponerror: false
            },
            files: {
                src: [
                    'dev/**/*.html'
                ]
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'build/index.html'
                }
            }
        },
        qunit: {
            dev: {
                options: {
                    'phantomPath': 'C:/Users/deagle/AppData/Roaming/npm/node_modules/phantomjs/lib/phantom/phantomjs.exe'
                },
                src: ['test/runner.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-croc-qunit');

    grunt.registerTask('work', ['concurrent:watch']);

    grunt.registerTask('test', ['browserify:test', 'test-js-create', 'qunit:dev']);

    grunt.registerTask('build-js', ['browserify:build', 'uglify:build']);
    grunt.registerTask('build-css', ['compass:build', 'cssmin:build']);
    grunt.registerTask('build', ['jshint', 'clean', 'copy:build', 'concurrent:build']);

    grunt.registerTask('test-js-create', function() {

        var scripts = '<script type="text/javascript" src="../dev/js/lib/jquery/jquery.min.js"></script><script type="text/javascript" src="qunit.js"></script>';
        grunt.file.recurse('test/js/app', function(abspath, rootdir, subdir, filename) {
            if (filename.indexOf('_test') > -1) {
                grunt.log.writeln('-- injecting... ' + abspath);
                //scripts += '<script src="' + abspath.replace('test/', '../dev/').replace('Test', '') + '"></script>';
                scripts += '<script src="' + abspath.replace('test/', '') + '"></script>';
            }
        });

        var head = '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>Grunt Qunit Tests</title><link rel="stylesheet" type="text/css" href="qunit.css" />',
            foot = '</head><body><div id="qunit"></div><div id="qunit-fixture"></div></body></html>',
            html = head + scripts + foot;

        grunt.file.write('test/runner.html', html);
        grunt.log.ok('test/runner.html written successfully!')
    });
};