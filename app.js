'use strict';

var SwaggerExpress = require('swagger-express-mw');
var swaggerUi = require('swagger-ui-express');
var app = require('express')();

//Path of swagger.json file in your app directory
var swaggerDocument = require('./api/swagger/swagger.json');

//Expose your swagger documentation through your express framework
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

});
