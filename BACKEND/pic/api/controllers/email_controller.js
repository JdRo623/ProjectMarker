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

        var variables = [];
        var correo_1 = {};
        var correo_2 = {};
        var correo_3 = {};

        var ultimo_correo = {};

        variablesHandler.find(
          {
            nombre: {
              $in: ["correo_1", "correo_2", "correo_3", "ultimo_correo"],
            },
          },
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
                email: obtener.email.trim(),
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
                if (!UsuarioBuscado) {
                  return res.status(602).send({
                    estado: "Error",
                    message: util.format("El usuario no existe en el sistema"),
                    data: Object.assign({}),
                  });
                }
                correos.forEach((variableCorreo) => {
                  switch (variableCorreo.nombre) {
                    case "correo_1":
                      correo_1 = {
                        nombre: variableCorreo.nombre,
                        valor: variableCorreo.valor,
                        valor_2: variableCorreo.valor_2,
                      };
                      break;
                    case "correo_2":
                      correo_2 = {
                        nombre: variableCorreo.nombre,
                        valor: variableCorreo.valor,
                        valor_2: variableCorreo.valor_2,
                      };
                      break;
                    case "correo_3":
                      correo_3 = {
                        nombre: variableCorreo.nombre,
                        valor: variableCorreo.valor,
                        valor_2: variableCorreo.valor_2,
                      };
                      break;
                    case "ultimo_correo":
                      ultimo_correo = {
                        nombre: "ultimo_correo",
                        valor_2: variableCorreo.valor_2,
                      };
                      break;
                  }
                });

                switch (ultimo_correo.valor_2) {
                  case "correo_1":
                    informacionCorreo.correo = tools
                      .decrypt(correo_2.valor)
                      .split("|")[0];
                    informacionCorreo.pass = tools
                      .decrypt(correo_2.valor)
                      .split("|")[1];
                    correo_2.valor_2 = parseInt(correo_2.valor_2) + 1 + "";
                    ultimo_correo.valor_2 = "correo_2";
                    break;
                  case "correo_2":
                    informacionCorreo.correo = tools
                      .decrypt(correo_3.valor)
                      .split("|")[0];
                    informacionCorreo.pass = tools
                      .decrypt(correo_3.valor)
                      .split("|")[1];
                    correo_3.valor_2 = parseInt(correo_3.valor_2) + 1 + "";
                    ultimo_correo.valor_2 = "correo_3";
                    break;
                  case "correo_3":
                    informacionCorreo.correo = tools
                      .decrypt(correo_1.valor)
                      .split("|")[0];
                    informacionCorreo.pass = tools
                      .decrypt(correo_1.valor)
                      .split("|")[1];
                    correo_1.valor_2 = parseInt(correo_1.valor_2) + 1 + "";
                    ultimo_correo.valor_2 = "correo_1";
                    break;
                  default:
                    informacionCorreo.correo = tools
                      .decrypt(correo_1.valor)
                      .split("|")[0];
                    informacionCorreo.pass = tools
                      .decrypt(correo_1.valor)
                      .split("|")[1];
                    correo_1.valor_2 = parseInt(correo_1.valor_2) + 1 + "";
                    ultimo_correo.valor_2 = "correo_1";
                    break;
                }

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
                  email: obtener.email.trim(),
                };
                variables.push(correo_1);
                variables.push(correo_2);
                variables.push(correo_3);
                variables.push(ultimo_correo);

                user_jModel.findOneAndUpdate(
                  filtro,
                  { contrasena_maestra: UsuarioBuscado.contrasena_maestra },
                  function (err, result) {
                    if (err) {
                      return res.status(602).send({
                        estado: "Error",
                        message: util.format(
                          "Error actualizando cuenta de usuario."
                        ),
                        data: Object.assign({}),
                      });
                    }
                    var correoDestinatario = obtener.email;
                    //var correoDestinatario = "JdRodriguez623@outlook.com";
                    var mailOptions = {
                      from: "Remitente",
                      to: correoDestinatario,
                      subject: "Contraseña Sistema PIC",
                     /* text:
                        "!Hola " +
                        tools.decrypt(UsuarioBuscado.nombres) +
                        "! \n" +
                        "Tu nueva contraseña maestra para ingresar al Sistema PIC es: \n\n" +
                        UsuarioBuscado.contrasena_maestra +
                        "\n\nPor favor, ingresala en el sistema para modificar tu contraseña.",*/
                      html:
                        '<p >!Hola ' +tools.decrypt(UsuarioBuscado.nombres) +'!</p>'+
                        '<p >Tu nueva contraseña maestra para ingresar al Sistema PIC es:</p>'+
                        '<p >' +UsuarioBuscado.contrasena_maestra+'</p>'+
                        '<p >Por favor, ingresala en el sistema para modificar tu contraseña.</p>'+

                        '<a href="mirutadian.com/user/reset">mirutadian.com</a>',
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        console.log(error);

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
                          variables.map((variable) => ({
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
