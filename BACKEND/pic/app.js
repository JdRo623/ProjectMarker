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
var CryptoJS = require("crypto-js");
var http = require('http');
var https = require('https');
var fs = require('fs');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.mirutadian.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.mirutadian.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.mirutadian.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use(interceptor(function (req, res) {
  return {
    isInterceptable: function () {
      return true;
    },
    intercept: function (body, done) {
      res.set('Content-Type', 'application/json');
      body = CryptoJS.AES.encrypt(JSON.stringify(body), keys.cryptoKeys).toString();
      done(JSON.stringify({ respuesta: body }));
    }
  };
}));


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


mongoose.connect('mongodb+srv://admin_unal_pic:handler.2020*@clusterpic-7hysd.mongodb.net/unal_pic?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB conectado...'))
  .catch(err => console.log(err))

SwaggerExpress.create(config, function (err, swaggerExpress) {

  if (err) { throw err; }
  app.use(cors());
  // install middleware
  swaggerExpress.register(app);
  var port = process.env.PORT || 5000;
  //app.listen(port);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(8443, () => {
	console.log('HTTPS Server running on port 443');
});

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
