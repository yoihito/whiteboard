var express = require('express')
var fs = require('fs')
module.exports = function(parent, options) {
  var verbose = options.verbose
  var controllersDir = __dirname + '/../app/controllers/';
  var routesDir = __dirname + '/routes/';

  fs.readdirSync(controllersDir).forEach(function(name) {
    verbose && console.log('Controller name: %s \n', name);

    var app = express();
    var controller = require(controllersDir + name);
    var routes = require(routesDir + name)
    var prefix = routes.prefix || '';
    var method;
    var path;

    for (var action in controller) {

      if (['before'].indexOf(action)>=0) {
        continue;
      }

      if (Object.keys(routes).indexOf(action)>=0) {
        method = routes[action].method
        path = routes[action].path
        continue;
      }

      switch (action) {
        case 'show':
          method = 'get';
          path = '/' + name + '/:' + name + '_id';
        break;
        case 'index':
          method = 'get';
          path = '/' + name + 's';
        break;
        case 'new':
          method = 'get';
          path = '/' + name;
        break;
        case 'create':
          method = 'post';
          path = '/' + name;
        break;
        case 'edit':
          method = 'get';
          path = '/' + name + '/edit';
        break;
        case 'update:':
          method = 'put';
          path = '/' + name;
        break;
        default:
          throw new Error('undefined route');
      }
    }

    handler = controller[action]
    path = prefix + path
    app[method](path, handler);

    verbose && console.log('  %s %s -> %s', method.upperCase(), path, action);

    parent.use(app);
  });
}
