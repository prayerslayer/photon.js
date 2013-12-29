/*
 * Gruntfile.js
 * @version 1.0.0
 */

'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: { 
      "name": 'photon' 
    },
    tag: {
      banner: '/*! <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today(\'yyyy\') %> @prayerslayer | MIT license | github.com/prayerslayer/photon */\n',
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: 'src/<%= project.name %>.js'
    },
    concat: {
      distjs: {
        src: ['src/<%= project.name %>.js'],
        dest: 'dist/<%= project.name %>.js'
      },
      options: {
        banner: '<%= tag.banner %>'
      }
    },
    cssmin: {
      css: {
        files: {
          "dist/<%= project.name %>.min.css": "dist/<%= project.name %>.css"
        }
      }
    },
    stylus: {
      css: {
        files: {
          "dist/<%= project.name %>.css": "src/<%= project.name %>.stylus"
        }
      }
    },
    uglify: {
      files: {
        src: ['dist/<%= project.name %>.js'],
        dest: 'dist/<%= project.name %>.min.js'
      },
      options: {
        banner: '<%= tag.banner %>'
      }
    },
    watch: {
      concat: {
        files: 'src/{,*/}*.js',
        tasks: ['concat:dist', 'uglify']
      }
    }
  });

  grunt.registerTask('default' , [
    'jshint',
    "stylus",
    'concat',
    'uglify',
    "cssmin"
  ]);

};