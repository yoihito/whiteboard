var fs = require('fs');
var _ = require('lodash');
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

  var date = new Date();

  grunt.registerTask('generate', 'Generate something', function(type, name) {
    if (type == 'controller') {
      _.forEach([
        'app/controllers/' + name + '.js',
        'config/routes/' + name + '.js',
        'views/'+name+'/.keep'
      ], function (filename) {
        // @@TODO change "by grunt" to "by username"
        grunt.file.write(filename, '// Created by grunt on ' + date);
        grunt.log.ok('Successfully created: ' + filename);
      });
    }
  });

  grunt.registerTask('destroy', 'Destroy something', function(type, name) {
    if (type == 'controller') {
      _.forEach([
        'app/controllers/' + name + '.js',
        'config/routes/' + name + '.js',
        'views/'+name
      ], function(filename) {
        grunt.file.delete(filename);
        grunt.log.error('Successfully destroyed: ' + filename);
      });
    }
  });

}
