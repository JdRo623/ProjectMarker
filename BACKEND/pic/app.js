'use strict';

var interceptor = require('express-interceptor');
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const mongoose = require('mongoose')
var cors = require('cors');
var keyczar = require('keyczarjs');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};
var interceptor = require('express-interceptor');
module.exports = app; // for testing
var keyczar = require('keyczarjs');
var bodyParser = require('body-parser');
var keys = require('./api/utils/keys.js');

app.use(interceptor(function(req,res){
  return {
    isInterceptable: function(){
      return true;
    },
    intercept: function(body, done) {
      res.set('Content-Type', 'application/json');
    var keyset = keyczar.fromJson(JSON.stringify(keys.keys));
    body = keyset.encrypt(body);
      done(JSON.stringify({respuesta: body}));
    }
  };
}));


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
//mongoose.connect('mongodb://CNE_Registro:CarvajalRegistro_2019*@cne-db-mongo-02.eastus.cloudapp.azure.com:27017/Registro')


mongoose.connect('mongodb+srv://admin_unal_pic:handler.2020*@clusterpic-7hysd.mongodb.net/unal_pic?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB conectado...'))
  .catch(err => console.log(err))

SwaggerExpress.create(config, function(err, swaggerExpress) {

  if (err) { throw err; }
app.use(cors());
  // install middleware
  swaggerExpress.register(app);
  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
