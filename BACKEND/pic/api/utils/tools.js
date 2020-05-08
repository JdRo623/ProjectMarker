'use strict';
var keys = require('./keys.js');
var keyczar = require('keyczarjs');


module.exports = {
  getFechaActual: getFechaActual,
  decrypt: decrypt,
  encrypt: encrypt,
  generadorConsecutivo: generadorConsecutivo
};

function getFechaActual() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();
  var hour = today.getHours();
  var minu = today.getMinutes();
  var ss = today.getSeconds();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (minu < 10) minu = '0' + minu;
  if (ss < 10) ss = '0' + ss;
  if (hour < 10) hour = '0' + hour;

  return dd + '-' + mm + '-' + yyyy + ' ' + hour + ':' + minu + ':' + ss;
}


function decrypt(text) {
  var response
  try {
    var keyset = keyczar.fromJson(JSON.stringify(keys.keys));
    response = (keyset.decrypt(text));
  } finally {
    return (response);
  }

}

function encrypt(text) {
  var keyset = keyczar.fromJson(JSON.stringify(keys.keys));
  var textDecrypt = (keyset.encrypt(text));
  return textDecrypt;
}


function generadorConsecutivo() {
  var today = new Date();
  var dd = today.getDate();
  var ss = today.getSeconds() + 1;
  var random1 = Math.floor((Math.random() * 99) + 1);
  var random3 = Math.floor((Math.random() * 99) + 1);
  var random2 = Math.floor((Math.random() * 9) + 1);
  if (dd < 10) dd = '0' + dd;
  return random3 + '' + dd + '' + random1 + '-' + (ss * random2);
}
