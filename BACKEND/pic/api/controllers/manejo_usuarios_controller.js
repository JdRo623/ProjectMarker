'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const Usuario = require('../../models/usuario.model');
const User_js = require('../../models/user_j.model');

var tools = require('../utils/tools.js');

module.exports = {
    identificacionUsuario: identificacionUsuario,
    crearUsuario: crearUsuario,
};


function identificacionUsuario(req, res) {
    try {
        var identificacion = async (req, res) => {
            var reqDecrypt = (tools.decryptJson(req.body.data))
            const correo = {
                correo: reqDecrypt.correo.toLowerCase()
            }

            await User_js.findOne(correo, (err, usuario) => {
                if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign(correo) });
                if (!usuario) {
                    return res.status(603).send({ estado: 'Error', message: 'Usuario no existe', data: Object.assign(correo) });
                } else {
                    if (tools.decrypt(usuario.identificacion) == reqDecrypt.secret) {
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
                    } else {
                        return res.status(200).send({ estado: 'Error', message: 'Contraseña Incorrecta', data: Object.assign(correo) });

                    }
                }
            }
            );
        }
        identificacion(req, res)
    } catch (err) {
        throw boom.boomify(err)
    }
}

function crearUsuario(req, res) {
    try {
        var creacion = async (req, res) => {
            var reqDecrypt = (tools.decrypt(req.body.data))
            //  var reqDecrypt = ((req.body))

            var pendienteValor = 'Pendiente';
            var JSONUsuario = {
                cedula: reqDecrypt.cedula,
                nombres: reqDecrypt.nombre,
                fecha_registro: tools.getFechaActual(),
                apellidos: reqDecrypt.apellido,
                contrasena: tools.encrypt(reqDecrypt.contrasena),
                estado_cuenta: pendienteValor,
                sesion: pendienteValor,
                correo: reqDecrypt.correo.toLowerCase(),
                rol: reqDecrypt.rol,
                cargo: reqDecrypt.cargo,
                dependencia: reqDecrypt.dependencia,
                numero_contacto: reqDecrypt.numero_contacto,
                estado: "Activo"
            }
            var usuario = new Usuario(JSONUsuario);
            usuario.save((err, usuarioG) => {
                if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign({}) });
                if (!usuarioG) return res.status(200).send({ estado: 'Error', message: 'No fue posible registrar al Usuario', data: Object.assign({}) });
                usuarioG.contrasena = '';
                return res.status(200).send({
                    estado: 'Registrado',
                    message: util.format("Usuario registrado exitosamente"),
                    data: Object.assign(usuarioG)
                });
            });
        }
        creacion(req, res)
    } catch (err) {
        throw boom.boomify(err)
    }
}