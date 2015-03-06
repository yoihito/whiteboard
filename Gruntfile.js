var fs = require('fs');
var loadGenerators = require('./tasks/generators');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest : {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['tests/**/*.js']
      }
    }
  });

  loadGenerators(grunt);
}
