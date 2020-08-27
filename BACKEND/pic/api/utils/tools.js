"use strict";
var keys = require("./keys.js");
var keyczar = require("keyczarjs");
var CryptoJS = require("crypto-js");

module.exports = {
  getFechaActual: getFechaActual,
  decrypt: decrypt,
  encrypt: encrypt,
  decryptJson: decryptJson,
  generadorConsecutivo: generadorConsecutivo,
  validarVacioNivel3: validarVacioNivel3,
  validarVacioNivel4: validarVacioNivel4,
  esNivelNuevo: esNivelNuevo,
  validarVacio: validarVacio,
  validarNivelPredecespor: validarNivelPredecespor,
  getFechaActualPreguntas: getFechaActualPreguntas,
  obtenerDiferenciaFechas: obtenerDiferenciaFechas
};

function getFechaActual() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();
  var hour = today.getHours();
  var minu = today.getMinutes();
  var ss = today.getSeconds();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (minu < 10) minu = "0" + minu;
  if (ss < 10) ss = "0" + ss;
  if (hour < 10) hour = "0" + hour;

  return dd + "-" + mm + "-" + yyyy + " " + hour + ":" + minu + ":" + ss;
}

function getFechaActualPreguntas() {
  var today = new Date();
  return today
}

function obtenerDiferenciaFechas(fechaInicio) {
  var today = new Date(); //119999
  var fechaInicial = new Date(fechaInicio);
  const diffTime = Math.abs(fechaInicial - today);
  return diffTime;
}

function encrypt(text) {
  var response;
  try {
    response = CryptoJS.AES.encrypt(text, keys.cryptoKeys).toString();
  } finally {
    return response;
  }
}

function decrypt(text) {
  var response;
  try {
    var bytes = CryptoJS.AES.decrypt(text, keys.cryptoKeys);
    response = bytes.toString(CryptoJS.enc.Utf8);
  } finally {
    return response;
  }
}

function encryptJson(text) {
  var response;
  try {
    response = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      keys.cryptoKeys
    ).toString();
  } finally {
    return response;
  }
}

function decryptJson(text) {
  var response;
  try {
    var bytes = CryptoJS.AES.decrypt(text, keys.cryptoKeys);
    response = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    console.log(err);
  } finally {
    return response;
  }
}

function generadorConsecutivo() {
  var today = new Date();
  var dd = today.getDate();
  var ss = today.getSeconds() + 1;
  var random1 = Math.floor(Math.random() * 99 + 1);
  var random3 = Math.floor(Math.random() * 99 + 1);
  var random2 = Math.floor(Math.random() * 9 + 1);
  if (dd < 10) dd = "0" + dd;
  return random3 + "" + dd + "" + random1 + "-" + ss * random2;
}

function generadorContrasena() {
  var today = new Date();
  var dd = today.getDate();
  var ss = today.getSeconds() + 1;
  var random1 = Math.floor(Math.random() * 99 + 1);
  var random3 = Math.floor(Math.random() * 99 + 1);
  var random2 = Math.floor(Math.random() * 9 + 1);
  if (dd < 10) dd = "0" + dd;
  return random3 + "" + dd + "" + random1 + "-" + ss * random2;
}

function validarVacioNivel3(text) {
  if (text == "") {
    return "OTRO";
  } else {
    return text;
  }
}

function validarVacio(text) {
  if (text == "") {
    return "N/A";
  } else {
    return text;
  }
}

function validarVacioNivel4(text) {
  if (text == "") {
    return "NINGUNO";
  } else {
    return text;
  }
}

function validarNivelPredecespor(text) {
  if (text == "") {
    return "N/A";
  } else {
    return text;
  }
}

function esNivelNuevo(niveles, nivel) {
  if (niveles.includes(nivel)) {
    return false;
  } else {
    return true;
  }
}

async function esNivelNuevo2(niveles, nivel) {
  await niveles.forEach((element) => {
    if (element.nombre == nivel.nombre) {
      if (element.predecesor == nivel.predecesor) {
        // console.log(element)
        // console.log(nivel)
        return false;
      }
    }
  });
  return true;
}
