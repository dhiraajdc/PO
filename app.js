/*'use strict';

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
*/
/**
* Copyright 2014 IBM
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
**/

var express = require('express');

var PORT = 80;

var app = express();
app.get('/', function (req, res) {
  res.send('Welcome to IBM Cloud DevOps with Docker. Lets go use the Continuous Delivery Service');
});

app.listen(PORT)
console.log(' Application Running on port' + PORT);