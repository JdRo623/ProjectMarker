"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const config = require("../../config.json");
const plantillaHomologaciones = require("../utils/plantillaHomologaciones");
const plantillaPlanta = require("../utils/plantillaPlanta");
const plantillaMatrizRoles = require("../utils/plantillaMatrizRoles");

module.exports = {
  envioPlantillaHomologaciones: envioPlantillaHomologaciones,
  envioPlantillaPic: envioPlantillaPic,
  envioPlantillaPlanta: envioPlantillaPlanta
};

function envioPlantillaHomologaciones(req, res) {
  try {
    var carga = async (req, res) => {
      try {
        let respuesta = {
          documento: plantillaHomologaciones.plantilla,
          nombreArchivo: "Plantilla de Homologaciones.xlsx",
        };
        return res.status(200).send({
          estado: "Descargado",
          message: util.format("Plantilla de homologaciones descargada"),
          data: Object.assign(respuesta),
        });
      } catch (error) {
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

function envioPlantillaPlanta(req, res) {
    try {
      var carga = async (req, res) => {
        try {
          let respuesta = {
            documento: plantillaPlanta.plantilla,
            nombreArchivo: "Plantilla Planta.xlsx",
          };
          return res.status(200).send({
            estado: "Descargado",
            message: util.format("Plantilla de Planta descargada"),
            data: Object.assign(respuesta),
          });
        } catch (error) {
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

  function envioPlantillaPic(req, res) {
    try {
      var carga = async (req, res) => {
        try {
          let respuesta = {
            documento: plantillaMatrizRoles.plantilla,
            nombreArchivo: "Plantilla Matriz de Roles.xlsx",
          };
          return res.status(200).send({
            estado: "Descargado",
            message: util.format("Plantilla de Matriz de Roles descargada"),
            data: Object.assign(respuesta),
          });
        } catch (error) {
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

