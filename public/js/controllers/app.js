define([
  'knockout'
], function (ko) {

  var app = {

    // Route table
    // Format: {route}: {path/to/controller}
    routes: {
      '/': 'pages/todo',
      //
      '/404': '404'
    },
    
    // Run when app is loaded
    load: function () {
      console.log('APP LOADED');
    },

    // On route loaded/changed
    onRoute: function () {
      
    }
  };

  return app;

});