'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const Pregunta = require('../../models/preguntas.model');
var tools = require('../utils/tools.js');

module.exports = {
    obtenerProcesos: obtenerProcesos,
    obtenerCargos: obtenerCargos,
    obtenerSubprocesos: obtenerSubprocesos,
    obtenerCompetencias: obtenerCompetencias,
};


function obtenerProcesos(req, res) {
    try {
        var obtener = async (req, res) => {
            var reqDecrypt = (tools.decrypt(req.body.data))
            let filtros = {
                cargo: reqDecrypt.cargo
            }
            /* if(reqDecrypt.proceso)filtros.proceso = reqDecrypt.proceso
             if(reqDecrypt.subproceso)filtros.subproceso = reqDecrypt.subproceso*/
            await Pregunta.find(filtros, (err, preguntas) => {
                if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign() });
                if (!preguntas) {
                    return res.status(200).send({ estado: 'Error', message: 'No existen procesos', data: Object.assign() });
                } else {
                    var respuesta = []
                    preguntas.forEach(element => {
                        if (!respuesta.includes(element.proceso)) {
                            respuesta.push(element.proceso);
                        }
                    });

                    return res.status(200).send({
                        estado: 'Obtenidas',
                        message: util.format('Información Obtenida'),
                        data: Object.assign(respuesta)
                    });
                }
            });
        }
        obtener(req, res)
    } catch (err) {
        throw boom.boomify(err)
    }
}

function obtenerCargos(req, res) {
    try {
        var obtener = async (req, res) => {
            var reqDecrypt = (tools.decrypt(req.body.data))
            /* if(reqDecrypt.proceso)filtros.proceso = reqDecrypt.proceso
             if(reqDecrypt.subproceso)filtros.subproceso = reqDecrypt.subproceso*/
            await Pregunta.find((err, preguntas) => {
                if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign() });
                if (!preguntas) {
                    return res.status(200).send({ estado: 'Error', message: 'No existen procesos', data: Object.assign() });
                } else {
                    var respuesta = []
                    preguntas.forEach(element => {
                        if (!respuesta.includes(element.cargo)) {
                            respuesta.push(element.cargo);
                        }
                    });

                    return res.status(200).send({
                        estado: 'Obtenidas',
                        message: util.format('Información Obtenida'),
                        data: Object.assign(respuesta)
                    });
                }
            });
        }
        obtener(req, res)
    } catch (err) {
        throw boom.boomify(err)
    }
}

function obtenerSubprocesos(req, res) {
    try {
        var obtener = async (req, res) => {
            var reqDecrypt = (tools.decrypt(req.body.data))
            let filtros = {
                proceso: reqDecrypt.proceso,
                cargo: reqDecrypt.cargo
            }
            var procesos = {
            }
            /* if(reqDecrypt.proceso)filtros.proceso = reqDecrypt.proceso
             if(reqDecrypt.subproceso)filtros.subproceso = reqDecrypt.subproceso*/
            await Pregunta.find(filtros, (err, preguntas) => {
                if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign() });
                if (!preguntas) {
                    return res.status(200).send({ estado: 'Error', message: 'No existen procesos', data: Object.assign() });
                } else {
                    var respuesta = []
                    preguntas.forEach(element => {
                        if (!respuesta.includes(element.subproceso)) {
                            respuesta.push(element.subproceso);
                        }
                    });

                    return res.status(200).send({
                        estado: 'Obtenidas',
                        message: util.format('Información Obtenida'),
                        data: Object.assign(respuesta)
                    });
                }
            });
        }
        obtener(req, res)
    } catch (err) {
        throw boom.boomify(err)
    }
}

function obtenerCompetencias(req, res) {
    try {
        var obtener = async (req, res) => {
            var reqDecrypt = (tools.decrypt(req.body.data))
            const filtros= {
                cargo: reqDecrypt.cargo,
                procesado: reqDecrypt.proceso,
                subproceso:reqDecrypt.subproceso
            }
            /* if(reqDecrypt.proceso)filtros.proceso = reqDecrypt.proceso
             if(reqDecrypt.subproceso)filtros.subproceso = reqDecrypt.subproceso*/
            await Pregunta.find(filtros, (err, preguntas) => {
                if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign() });
                if (!preguntas) {
                    return res.status(200).send({ estado: 'Error', message: 'No existen procesos', data: Object.assign() });
                } else {
                    var respuesta = []
                    preguntas.forEach(element => {
                        if (!respuesta.includes(element.competencia)) {
                            respuesta.push(element.competencia);
                        }
                    });

                    return res.status(200).send({
                        estado: 'Competencias Obtenidas',
                        message: util.format('Información Obtenida'),
                        data: Object.assign(respuesta)
                    });
                }
            });
        }
        obtener(req, res)
    } catch (err) {
        throw boom.boomify(err)
    }

}
