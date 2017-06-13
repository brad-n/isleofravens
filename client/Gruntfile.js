// TODO: exclude .spec.js and assets/*.js
// Generated on 2014-03-01 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var path = require('path');

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-html2js');
	 grunt.loadNpmTasks('grunt-git-describe');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'src',
            dist: 'dist', 
        },

		  pkg: grunt.file.readJSON('package.json'),

		  'git-describe': {
			 options: {
				prop: 'meta.revision'
			 }
			 ,me: {}
		  },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['src/js/{,*/}*.*'],
                tasks: ['newer:jshint:all'],
                options: {
                    //livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            css: {
                files: ['src/css/{,*/}*.css'],
                tasks: ['newer:copy:css', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                  'src/{,*/}*.html',
                  'src/index.html',
                  'src/js/**/{,*/}*.html',
                  '.tmp/css/{,*/}*.css',
                  'src/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['html2js'],
            },
            e2eTest: {
                files: ['test/e2e/{,*/}*.js'],
                tasks: [
                  'protractor_webdriver:start',
                  'protractor:test'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                      '.tmp',
                      'src'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                      '.tmp',
                      'test',
                      'src'
                    ]
                }
            },
            dist: {
                options: {
                    base: 'dist'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
              'Gruntfile.js',
              'src/js/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                      '.tmp',
                      'dist/*',
                      '!dist/api',
                      '!dist/go',
                      '!dist/import',
                      '!dist/tree_images',
                      '!dist/tmp*',
                      '!dist/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/css/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        'bowerInstall': {
            app: {
                src: 'src/index.html',
                ignorePath: 'src/'
            }
            /*
                  ,test: {
                    src: 'test/karma.conf.js',
                    fileTypes: {
                        js: {	
                            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r.)*?(\/\/\s*endbower)/gi
                            ,detect: {
                                js: /".*\.js"/gi
                            }	
                            ,replace: {
                                js: '"{{filePath}}",'
                            }
                        }
                    }
                  }
            */
        },





        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                      'dist/js/{,*/}*.js',
                      'dist/css/{,*/}*.css',
                 //     'dist/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                      'dist/css/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'dist'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['dist/{,*/}*.html'],
            css: ['dist/css/{,*/}*.css'],
            //options: {
            //    dest: 'dist',
            //    flow: {
            //        html: {
            //            steps: {
            //                js: ['concat', 'uglifyjs'],
            //                css: ['cssmin']
            //            },
            //            post: {}
            //        }
            //    }
            //}
            options: {
                assetsDirs: ['dist']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: 'dist/img'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/img',
                    src: '{,*/}*.svg',
                    dest: 'dist/img'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: 'dist'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: '*.js',
                    dest: 'dist/js'
                }]
            }
        },


        uglify: {
		  		options:{
					report: 'min',
					mangle: false
				}
         },


        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['dist/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: 'dist',
                    src: [
                      '*.{ico,png,txt}',
                      '.htaccess',
                      '*.html',
                      'views/{,*/}*.html',
                      'bower_components/**/*',
                      //'img/{,*/}*.{webp}',
                      'img/{,*/}*',
                      'js/{,*/}/*.html',
                      'js/**/*.tpl.html',
                      'patch/**/*',
                      //'img/*',
                      'fonts/*',
                      'compiled-tpl/*',
                      '.tmp/concat/*.js'
                    ]
                }
        /*
                ,{
                  expand: true,
                  cwd: '.tmp/img',
                  dest: 'dist/img',
                  src: ['generated/*']
                }
        */
                ]
            },

            /* Copy over unaltered, non-renamed css files for php to use */
            css_php: {
                expand: true,
                cwd: 'src/css',
                dest: 'dist/css',
                src: '{,*/}*.css'
            },
            /*
                    // unneeded cuz were just keeping those files in dist(public), 
                    // and excluding them from clean
                  php: {
                    expand: true,
                    cwd: 'src',
                    dest: 'dist/api/',
                    src: 'api/*.*'
                  },
            */
            js: {
                expand: true,
                cwd: '.tmp/concat/js',
                dest: 'dist/js',
                src: '{,*/}*.js'
            },
            css: {
                expand: true,
                cwd: 'src/css',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
              'copy:css'
            ],
            test: [
              'copy:css'
            ],
            dist: [
              'copy:css',
              'imagemin',
              'svgmin'
            ]
        },

        html2js: {
            options: {
                // custom options, see below
            },
            main: {
                src: ['src/js/**/*.html'],
                dest: 'src/compiled-tpl/templates.js'
            },
        },

        shell: {
          npm_install: {
            command: 'npm install'
          },
          update_webdriver: {
            command: 'node ' + path.join('node_modules/protractor/bin', 'webdriver-manager') + ' update'
          }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       'dist/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         'src/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       'dist/scripts/scripts.js': [
        //         'dist/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        protractor_webdriver: {
          start: {}
        },

        protractor: {
          options: {
            configFile: "test/protractor.conf.js"
          },
          test: {
            // it needs at least one target
            options: {}
          },
          testfirefox: {
            options: {
              args: {
                browser: "firefox"
              }
            }
          }
        }
    });


	grunt.registerTask('tag-revision', 'Tag the current build revision', function () {
	  grunt.task.requires('git-describe');
		var hostname = require("os").hostname();

		grunt.event.once('git-describe', function (rev) {
			grunt.log.writeln("Git Revision: " + rev);

			  grunt.file.write('dist/version.txt', JSON.stringify({
				 git_commit_id: rev.object,
			    build_host:hostname,
				 date: grunt.template.today()
			  }));

		 });    
		 grunt.task.run('git-describe');
	});

	grunt.registerTask('version', ['git-describe', 'tag-revision']);


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
          'clean:server',
          'bowerInstall',
          'concurrent:server',
          'autoprefixer',
          'html2js',
          'connect:livereload',
          'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
      'clean:server',
      'concurrent:test',
      'autoprefixer',
      'connect:test',
      'karma',
      'e2e'
    ]);

    grunt.registerTask('test:e2e_dev', [
      'e2e',
      'watch'
    ]);

    grunt.registerTask('e2e-prepare', [ 
      'clean:server',
      'bowerInstall',
      'concurrent:server',
      'autoprefixer',
      'html2js',
      'connect:livereload',
      'protractor_webdriver:start'
    ]);

    grunt.registerTask('e2e', [
      'e2e-prepare',
      'protractor:test'
    ]);

    grunt.registerTask('e2e-firefox', [
      'e2e-prepare',
      'protractor:testfirefox'
    ]);

    grunt.registerTask('build', [
      'update',
      'clean:dist',
      'bowerInstall',      
      'useminPrepare',
      //'concurrent:dist',
      'autoprefixer',
      'html2js',
      'concat',
      'ngmin',
      'copy:dist',
      'cdnify',
      'cssmin',
      'uglify',
      'rev',
      'usemin',
      'htmlmin',
		'version',
      'copy:css_php'
    ]);

    grunt.registerTask('default', [
      'newer:jshint',
      'test',
      'build'
    ]);

    grunt.registerTask('update', [
      'shell:npm_install',
      'shell:update_webdriver'
    ]);

};
