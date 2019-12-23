'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
var keyczar = require('keyczarjs');

module.exports = {
    encriptar: encriptar,
    desencriptar: desencriptar,
  };


  function encriptar(req,res){
    try{
      var creacion = async(req,res)=>{
          var reqDecrypt = (encrypt(req.body.data))
          console.log(reqDecrypt)

          return res.status(200).send({
            estado: 'Encriptado',
            message: util.format("Encriptación completa"),
            data: Object.assign(reqDecrypt)
        });  
    }
      creacion(req,res)
    } catch (err){
        throw boom.boomify(err)
    }
}

function desencriptar(req,res){
    try{
      var creacion = async(req,res)=>{
          var reqDecrypt = (decrypt(req.body.data))
          console.log(reqDecrypt)

          return res.status(200).send({
            estado: 'Desencriptado',
            message: util.format("Desencriptación completa"),
            data: Object.assign(reqDecrypt)
        });  
    }
      creacion(req,res)
    } catch (err){
      return res.status(200).send({
        estado: 'Error',
        message: util.format("Error"),
        data: Object.assign(err)
    });  
    }
}





  function decrypt(text){
    var keys = {
      meta: '{\"name\":\"\",\"purpose\":\"DECRYPT_AND_ENCRYPT\",\"type\":\"AES\",\"versions\":[{\"exportable\":false,\"status\":\"PRIMARY\",\"versionNumber\":1}],\"encrypted\":false}',
      1: '{\"aesKeyString\":\"bk6yaO25sNMpE5EugUt3YA\",\"hmacKey\":{\"hmacKeyString\":\"1BqpH90Bw631dJTcVwNGiAs4YiKExtkpsBbDbg8x2pA\",\"size\":256},\"mode\":\"CBC\",\"size\":128}'
  };
    var keyset = keyczar.fromJson(JSON.stringify(keys));
    var textDecrypt = (keyset.decrypt(text));
    return JSON.parse(textDecrypt);
}

function encrypt(text){
    var keys = {
      meta: '{\"name\":\"\",\"purpose\":\"DECRYPT_AND_ENCRYPT\",\"type\":\"AES\",\"versions\":[{\"exportable\":false,\"status\":\"PRIMARY\",\"versionNumber\":1}],\"encrypted\":false}',
      1: '{\"aesKeyString\":\"bk6yaO25sNMpE5EugUt3YA\",\"hmacKey\":{\"hmacKeyString\":\"1BqpH90Bw631dJTcVwNGiAs4YiKExtkpsBbDbg8x2pA\",\"size\":256},\"mode\":\"CBC\",\"size\":128}'
  };
    var keyset = keyczar.fromJson(JSON.stringify(keys));
    var textDecrypt = (keyset.encrypt(text));
    return textDecrypt;
}