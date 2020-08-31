"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
var userHandler = require("../../models/user_j.model");
var userAdmin = require("../../models/usuario.model");
const tools = require("../utils/tools");

module.exports = {
  logIn: logIn,
};

function logIn(req, res) {
  try {
    var crear = async (req, res) => {
      
      var dec = tools.decryptJson(req.body.data);
      var filtro = {
        email: dec.email.toLowerCase(),
      };
      userHandler.findOne(filtro, (err, user) => {
        if (err) {
          return res.status(601).send({
            estado: "Error",
            message: "Error de servidor",
            data: Object.assign(err),
          });
        }
        if (user == null) {
          filtro = {
            correo: dec.email,
          };

          userAdmin.findOne(filtro, (err, adminEncontrado) => {
            if (err) {
              return res.status(601).send({
                estado: "Error",
                message: "Error de servidor",
                data: Object.assign(err),
              });
            }
            if (!adminEncontrado) {
              return res.status(601).send({
                estado: "Error",
                message: "Usuario no existente",
                data: Object.assign({}),
              });
            } else {
              if (tools.decrypt(adminEncontrado.contrasena) == dec.password) {
                const token = {
                  rol: 1,
                  token: jwt.sign({ user }, "my-secret", { expiresIn: 5400 }),
                  email: dec.email,
                };
                return res.status(200).send({
                  estado: "usuario encontrado",
                  message: "token del usuario",
                  data: Object.assign(token),
                });
              } else {
                return res.status(601).send({
                  estado: "Contraseña invalida",
                  message: "Contraseña invalida",
                  data: Object.assign({}),
                });
              }
            }
          });
        } else {
          if (user.password) {
            if (tools.decrypt(user.password) == dec.password) {
              const token = {
                token: jwt.sign({ user }, "my-secret", { expiresIn: 5400 }),
                email: dec.email,
              };
              return res.status(200).send({
                estado: "Usuario Encontrado",
                message: "Usuario Autenticado de manera exitosa",
                data: Object.assign(token),
              });
            } else {
              return res.status(601).send({
                estado: "Contraseña invalida",
                message: "Contraseña invalida",
                data: Object.assign({}),
              });
            }
          } else {
            if ((user.identificacion) == dec.password) {
              var send = {
                cambio_pass: true,
                email: dec.email,
              };
              const token = jwt.sign({ user }, "my-secret", {
                expiresIn: 5400,
              });
              send.token = token;
              return res.status(200).send({
                estado: "Usuario Encontrado",
                message: "Cambio de contraseña necesario",
                data: Object.assign(send),
              });
            } else {
              return res.status(601).send({
                estado: "Contraseña invalida",
                message: "Contraseña invalida",
                data: Object.assign({}),
              });
            }
          }
        }
      });
    };
    crear(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function verify(req, res, next) {
  var dec = decryptJson(req.body.data);
  jwt.verify(dec.token, "my-secret", (err, data) => {
    if (err) {
      return res.status(601).send({
        estado: "error",
        message: "error token invalido",
        //data: Object.assign(token)
      });
    } else {
      next();
    }
  });
}
