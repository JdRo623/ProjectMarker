"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
var tools = require("../utils/tools.js");
const subdireccion = require("../../models/subdireccion.model");
const NivelHandler = require("../../models/nivel.model");

module.exports = {
  subdireccionSeccional: subdireccionSeccional,
};

function subdireccionSeccional(req, res) {
  console.log(req.body.data);
  try {
    var obtener = async (req, res) => {
      const reqDecrypt = tools.decryptJson(req.body.data);
      const filtro = {
        predecesor: reqDecrypt.seccional,
        tipo_nivel: "NIVEL_3",
      };
      await NivelHandler.find(filtro, (err, subdirecciones) => {
        if (err) {
          return res.status(601).send({
            estado: "error",
            message: util.format(err),
          });
        }
        if (!subdirecciones) {
          return res.status(200).send({
            estado: "No hay subdirecciones",
            message: util.format("No Hay subdirecciones"),
          });
        }
        subdirecciones.cargos = [];
        subdirecciones.sort(function (a, b) {
          if (a.nombre < b.nombre) {
            return -1;
          }
          if (a.nombre > b.nombre) {
            return 1;
          }
          return 0;
        });
        return res.status(200).send({
          estado: "Exito",
          message: util.format("Subdirecciones obtenidas con Exito"),
          data: Object.assign(subdirecciones),
        });
      });
    };
    obtener(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}
