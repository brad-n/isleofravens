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
                files: ['<%= yeoman.app %>/js/{,*/}*.*'],
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
                files: ['<%= yeoman.app %>/css/{,*/}*.css'],
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
                  '<%= yeoman.app %>/{,*/}*.html',
                  '<%= yeoman.app %>/index.html',
                  '<%= yeoman.app %>/src/**/{,*/}*.html',
                  '.tmp/css/{,*/}*.css',
                  '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
                      '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                      '.tmp',
                      'test',
                      '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
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
              '<%= yeoman.app %>/src/{,*/}*.js'
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
                      '<%= yeoman.dist %>/*',
                      '!<%= yeoman.dist %>/api',
                      '!<%= yeoman.dist %>/tmp*',
                      '!<%= yeoman.dist %>/.git*'
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
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
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
                      '<%= yeoman.dist %>/src/{,*/}*.js',
                      '<%= yeoman.dist %>/css/{,*/}*.css',
                 //     '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                      '<%= yeoman.dist %>/css/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
            //options: {
            //    dest: '<%= yeoman.dist %>',
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
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/img'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/img',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/img'
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
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
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
                    dest: '<%= yeoman.dist %>/js'
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
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                      '*.{ico,png,txt}',
                      '.htaccess',
                      '*.html',
                      'views/{,*/}*.html',
                      'bower_components/**/*',
                      //'img/{,*/}*.{webp}',
                      'img/{,*/}*',
                      'src/{,*/}/*.html',
                      'src/**/*.tpl.html',
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
                  dest: '<%= yeoman.dist %>/img',
                  src: ['generated/*']
                }
        */
                ]
            },

            /* Copy over unaltered, non-renamed css files for php to use */
            css_php: {
                expand: true,
                cwd: '<%= yeoman.app %>/css',
                dest: '<%= yeoman.dist %>/css',
                src: '{,*/}*.css'
            },
            /*
                    // unneeded cuz were just keeping those files in dist(public), 
                    // and excluding them from clean
                  php: {
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>/api/',
                    src: 'api/*.*'
                  },
            */
            js: {
                expand: true,
                cwd: '.tmp/concat/js',
                dest: '<%= yeoman.dist %>/js',
                src: '{,*/}*.js'
            },
            css: {
                expand: true,
                cwd: '<%= yeoman.app %>/css',
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
                src: ['<%= yeoman.app %>/src/**/*.tpl.html'],
                dest: '<%= yeoman.app %>/compiled-tpl/templates.js'
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
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
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
          'bower-install',
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
      'bower-install',
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
      'bower-install',      
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
