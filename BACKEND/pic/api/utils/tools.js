'use strict';
var keyczar = require('keyczarjs');


module.exports = {
    getFechaActual: getFechaActual,
    decrypt: decrypt,
    encrypt: encrypt
  };

function getFechaActual(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();
    var ss = today.getSeconds();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    if(minu<10) minu='0'+minu;
    if(ss<10) ss='0'+ss;
    if(hour<10) hour='0'+hour;

    return dd+'-'+mm+'-'+yyyy+' '+hour+':'+minu+':'+ss;
}


function decrypt(text){
    var keys = {
      meta: '{\"name\":\"\",\"purpose\":\"DECRYPT_AND_ENCRYPT\",\"type\":\"AES\",\"versions\":[{\"exportable\":false,\"status\":\"PRIMARY\",\"versionNumber\":1}],\"encrypted\":false}',
      1: '{\"aesKeyString\":\"JfEMByS4DjhzoPGJRtiF1A\",\"hmacKey\":{\"hmacKeyString\":\"cijFnmB6azfcR7wKOjbQHAU2ihPjenQI2hwM9kO4f78\",\"size\":256},\"mode\":\"CBC\",\"size\":128}'
  };
    var keyset = keyczar.fromJson(JSON.stringify(keys));
    var textDecrypt = (keyset.decrypt(text));
    return JSON.parse(textDecrypt);
}

function encrypt(text){
    var keys = {
      meta: '{\"name\":\"\",\"purpose\":\"DECRYPT_AND_ENCRYPT\",\"type\":\"AES\",\"versions\":[{\"exportable\":false,\"status\":\"PRIMARY\",\"versionNumber\":1}],\"encrypted\":false}',
      1: '{\"aesKeyString\":\"JfEMByS4DjhzoPGJRtiF1A\",\"hmacKey\":{\"hmacKeyString\":\"cijFnmB6azfcR7wKOjbQHAU2ihPjenQI2hwM9kO4f78\",\"size\":256},\"mode\":\"CBC\",\"size\":128}'
  };
    var keyset = keyczar.fromJson(JSON.stringify(keys));
    var textDecrypt = (keyset.encrypt(text));
    return textDecrypt;
}