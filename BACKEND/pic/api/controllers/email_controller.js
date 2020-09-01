"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
const rutaHandler = require("../../models/ruta_aprendizaje.model");
const tools = require("../utils/tools");
const nodemailer = require("nodemailer");
const variablesHandler = require("../../models/variables.model");
const user_jModel = require("../../models/user_j.model");

module.exports = {
  envioCorreoRecuperarContrasena: envioCorreoRecuperarContrasena,
};

function envioCorreoRecuperarContrasena(req, res) {
  try {
    var carga = async (req, res) => {
      try {
        var obtener = tools.decryptJson(req.body.data);
        var informacionCorreo = {
          correo: "",
          pass: "",
        };
        variablesHandler.find(
          { nombre: { $in: ["correo_1", "correo_2"] } },
          (err, correos) => {
            if (err) {
              return res.status(602).send({
                estado: "Error",
                message: util.format("Error enviando el correo"),
                data: Object.assign({}),
              });
            }
            user_jModel.findOne(
              {
                email: obtener.email,
              },
              (err, UsuarioBuscado) => {
                if (err) {
                  return res.status(602).send({
                    estado: "Error",
                    message: util.format(
                      "Error buscando al usuario en el sistema."
                    ),
                    data: Object.assign({}),
                  });
                }
                console.log();
                if (!UsuarioBuscado) {
                  return res.status(602).send({
                    estado: "Error",
                    message: util.format("El usuario no existe en el sistema"),
                    data: Object.assign({}),
                  });
                }

                correos.forEach((variableCorreo) => {
                  if (variableCorreo.valor_2 == "1") {
                    informacionCorreo.correo = tools
                      .decrypt(variableCorreo.valor)
                      .split("-")[0];
                    informacionCorreo.pass = tools
                      .decrypt(variableCorreo.valor)
                      .split("-")[1];
                    variableCorreo.valor_2 = "0";
                  } else {
                    variableCorreo.valor_2 = "1";
                  }
                });
                var transporter = nodemailer.createTransport({
                  service: "Gmail",
                  auth: {
                    user: informacionCorreo.correo,
                    pass: informacionCorreo.pass,
                  },
                });

                UsuarioBuscado.contrasena_maestra = Math.random()
                  .toString(36)
                  .slice(-8);

                const filtro = {
                  email: obtener.email,
                };

                user_jModel.findByIdAndUpdate(
                  filtro,
                  { contrasena_maestra: UsuarioBuscado.contrasena_maestra },
                  function (err, result) {
                    var correoDestinatario = obtener.email;
                    //var correoDestinatario = "JdRodriguez623@outlook.com";
                    var mailOptions = {
                      from: "Remitente",
                      to: correoDestinatario,
                      subject: "Contraseña Sistema PIC",
                      text:
                        "Tu nueva contraseña maestra para ingresar al Sistema PIC es: \n" +
                        UsuarioBuscado.contrasena_maestra +
                        "\n Por favor, ingresala en el Sistema para modificar tu contraseña",
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        return res.status(602).send({
                          estado: "Error",
                          message: util.format(
                            "Hubo un error en el envio del correo Electronico, por favor intentelo de nuevo"
                          ),
                          data: Object.assign({}),
                        });
                      } else {
                        var envio = {
                          cambio_pass: true,
                          email: obtener.email,
                        };
                        variablesHandler.bulkWrite(
                          correos.map((variable) => ({
                            updateOne: {
                              filter: { nombre: variable.nombre },
                              update: { $set: { valor_2: variable.valor_2 } },
                              upsert: true,
                            },
                          })),
                          (err, variablesActualizadas) => {
                            if (err) {
                              return res.status(602).send({
                                estado: "Error",
                                message: util.format(
                                  "Error actualizando variables del sistema."
                                ),
                                data: Object.assign({}),
                              });
                            }
                            var envio = {
                              cambio_pass: true,
                              email: obtener.email,
                            };
                            return res.status(200).send({
                              estado: "Contraseña Enviada",
                              message: util.format(
                                "Se ha enviado la contraseña maestra a su correo electronico"
                              ),
                              data: Object.assign(envio),
                            });
                          }
                        );
                      }
                    });
                  }
                );
              }
            );
          }
        );
      } catch (error) {
        console.log(error);
        return res.status(602).send({
          estado: "Error",
          message: util.format("Error enviando el correo"),
          data: Object.assign({}),
        });
      }
    };
    carga(req, res);
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
