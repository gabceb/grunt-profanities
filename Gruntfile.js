/*
 * grunt-profanities
 * https://github.com/gabceb/grunt-profanities
 *
 * Copyright (c) 2013 Gabriel Cebrian
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    profanities: {
      badCode: {
        options: {
          ignoreWords: ['fuck']
        },
        src: ['test/fixtures/bad_code.js']
      },
      badComments: {
        src: ['test/fixtures/bad_comments.js']
      },
      spanishComments: {
        options: {
          languages: ['en', 'es']
        },
        src: ['test/fixtures/spanish_comments.js']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['profanities', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
