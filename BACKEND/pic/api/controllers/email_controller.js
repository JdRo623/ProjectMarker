"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
const rutaHandler = require("../../models/ruta_aprendizaje.model");
const tools = require("../utils/tools");
const nodemailer = require('nodemailer')
module.exports = {
  envioCorreoRecuperarContrasena: envioCorreoRecuperarContrasena,
};

function envioCorreoRecuperarContrasena(req, res) {
  try {
    var carga = async (req, res) => {
      try {
        var obtener = tools.decryptJson(req.body.data);
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'alphabeto623@gmail.com',
                pass: 'DeadStar0341'
            }
        });
        var correoDestinatario = obtener.destino
        var randomstring = Math.random().toString(36).slice(-8);
        var mailOptions = {
            from: 'Remitente',
            to: 'jdrodriguez623@outlook.com',
            subject: 'Contraseña Sistema PIC',
            text: 'Tu nueva contraseña para ingresar al Sistema PIC es: \n'+randomstring+'\n'
        };



        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(req.body);
            }
        });
        
      } catch (error) {
        console.log(error);
        return res.status(602).send({
          estado: "demoro",
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
