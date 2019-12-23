'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const Usuario = require('../../models/usuario.model');
var keyczar = require('keyczarjs');

module.exports = {
    identificacionUsuario: identificacionUsuario,
    crearUsuario: crearUsuario,
  };


  function identificacionUsuario (req, res) {  
    try{
        var identificacion = async(req,res)=>{
            var reqDecrypt = (decrypt(req.body.data))
            const correo ={correo: reqDecrypt.correo.toLowerCase()}
            await Usuario.findOne(correo, (err, usuario) => {
                if(err)return res.status(500).send({ estado: 'Error',message: 'Error en la petición', data: Object.assign (correo)});
                if(!usuario){
                   return res.status(200).send({ estado: 'Error',message: 'Usuario no existe', data: Object.assign (correo)});
                } else{
                    if(decryptPass(usuario.contrasena) == reqDecrypt.secret){
                        var respuesta = {}
                        const token = jwt.sign({ sub: usuario.correo }, config.secret);
                        respuesta.token = token;
                        respuesta.nombres = usuario.nombres
                        respuesta.apellidos = usuario.apellidos
                        respuesta.cedula = usuario.cedula
                        respuesta.rol = usuario.rol
                        respuesta.numero_contacto = usuario.numero_contacto
                        return res.status(200).send({
                            estado: 'Aprobado',
                            message: util.format('Usuario Autorizado'),
                            data: Object.assign(respuesta)
                        });  
                    }else{
                        return res.status(200).send({ estado: 'Error',message: 'Contraseña Incorrecta', data: Object.assign (correo)});
    
                    }
                }

                
            });
        }
        identificacion(req,res)
    } catch (err){
        throw boom.boomify(err)
    }
}

function crearUsuario(req,res){
    try{
      var creacion = async(req,res)=>{
          var reqDecrypt = (decrypt(req.body.data))
        //  var reqDecrypt = ((req.body))

          var pendienteValor = 'Pendiente';
          var JSONUsuario ={
              numero_identificacion: reqDecrypt.numero_identificacion,
              nombre: reqDecrypt.nombre,
              apellido: reqDecrypt.apellido,
              contrasena: encrypt(reqDecrypt.contrasena),
              estado_cuenta: pendienteValor,
              sesion: pendienteValor, 
              correo: reqDecrypt.correo.toLowerCase(),
              rol: '1'
          }
          var usuario = new Usuario(JSONUsuario);
          Usuario.save((err, usuarioG) => {
              if(err)return res.status(500).send({ estado: 'Error',message: 'Error en la petición', data: Object.assign ({})});
              if(!usuarioG) return res.status(200).send({ estado: 'Error',message: 'No fue posible registrar al Usuario', data: Object.assign ({})});
              usuarioG.contrasena = '';
              return res.status(200).send({
                          estado: 'Registrado',
                          message: util.format("Usuario registrado exitosamente"),
                          data: Object.assign(usuarioG)
                      });  
              }); 
      }
      creacion(req,res)
  } catch (err){
      throw boom.boomify(err)
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
