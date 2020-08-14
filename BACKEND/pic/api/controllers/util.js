'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
var keyczar = require('keyczarjs');
var tools = require('../utils/tools.js');

module.exports = {
  encriptar: encriptar,
  desencriptar: desencriptar,
};


function encriptar(req, res) {
  try {
    var creacion = async (req, res) => {
      var reqDecrypt = (tools.encrypt(req.body.data))

      return res.status(200).send({
        estado: 'Encriptado',
        message: util.format("Encriptación completa"),
        data: Object.assign(reqDecrypt)
      });
    }
    creacion(req, res)
  } catch (err) {
    throw boom.boomify(err)
  }
}

function desencriptar(req, res) {
  try {
    var creacion = async (req, res) => {
      var reqDecrypt = (tools.decrypt(req.body.data))

      return res.status(200).send({
        estado: 'Desencriptado',
        message: util.format("Desencriptación completa"),
        data: Object.assign(reqDecrypt)
      });
    }
    creacion(req, res)
  } catch (err) {
    return res.status(200).send({
      estado: 'Error',
      message: util.format("Error"),
      data: Object.assign(err)
    });
  }
}

