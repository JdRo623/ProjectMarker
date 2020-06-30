"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
const Pregunta_w = require("../../models/preguntas_w.model");
var tools = require("../utils/tools.js");
const cuestionarioHandler = require("../../models/Cuestionario.model");

module.exports = {
  agregarPregunta: agregarPregunta,
  obtenerPreguntasNuevas: obtenerPreguntasNuevas,
  buscarPreguntasPorID: buscarPreguntasPorID,
  buscarPreguntasPorIDCuestionario: buscarPreguntasPorIDCuestionario,
  buscarCompetenciasCuestionario:buscarCompetenciasCuestionario
};

function buscarCompetenciasCuestionario(req, res) {
    try {
      var obtener = async (req, res) => {
        var dec = tools.decryptJson(req.body.data);
        console.log(dec.preguntas_obtener);
        var filtros = [];
  
        cuestionarioHandler.findOne(
          { email: dec.email },
          (err, cuestionarioBuscado) => {
            if (err)
              return res.status(500).send({
                estado: "Error",
                message: "Error en la petición",
                data: Object.assign(err),
              });
            if (!cuestionarioBuscado) {
              return res.status(200).send({
                estado: "Error",
                message: "No se encontraron Cuestionarios",
                data: Object.assign({}),
              });
            }
  
            cuestionarioBuscado.listado_competencias.forEach((competencia) => {
              if (competencia.estado_respuesta == "No respondida") {
                filtros.push(competencia);
              }
            });
  
            return res.status(200).send({
                estado: "Exito",
                message: util.format("Competencias obtenidas"),
                data: Object.assign(filtros),
              });
          }
        );
      };
      obtener(req, res);
    } catch (error) {
      throw boom.boomify(err);
    }
  }

function buscarPreguntasPorIDCuestionario(req, res) {
  try {
    var obtener = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);
      console.log(dec.preguntas_obtener);
      var filtros = [];

      cuestionarioHandler.findOne(
        { email: dec.email },
        (err, cuestionarioBuscado) => {
          if (err)
            return res.status(500).send({
              estado: "Error",
              message: "Error en la petición",
              data: Object.assign(err),
            });
          if (!cuestionarioBuscado) {
            return res.status(200).send({
              estado: "Error",
              message: "No se encontraron Cuestionarios",
              data: Object.assign({}),
            });
          }

          cuestionarioBuscado.listado_preguntas.forEach((preguntaBuscada) => {
            if (preguntaBuscada.estado_respuesta == "No respondida") {
              filtros.push(preguntaBuscada.id_pregunta);
            }
          });

          Pregunta_w.find(
            {
              numero_pregunta: { $in: filtros },
            },
            (err, preguntasBuscadas) => {
              if (err) {
                return res.status(603).send({
                  estado: "Error",
                  message: util.format(
                    "Ocurrió un error al buscar la pregunta en el servidor"
                  ),
                  data: Object.assign({}),
                });
              }
              if (!preguntasBuscadas) {
                return res.status(603).send({
                  estado: "Error",
                  message: util.format(
                    "No se encontró una pregunta con el número ingresado"
                  ),
                  data: Object.assign({}),
                });
              } else {
                var estructuraPregunta = [];
                preguntasBuscadas.forEach((preguntaBuscada) => {
                  estructuraPregunta.push({
                    idPregunta: preguntaBuscada.numero_pregunta,
                    situacionProblema: preguntaBuscada.situacion_problema,
                    encabezadoPregunta: preguntaBuscada.encabezado_pregunta,
                    opcionesRespuestas: [
                      {
                        enunciadoRespuesta: preguntaBuscada.respuesta3,
                        id: "C",
                      },
                      {
                        enunciadoRespuesta: preguntaBuscada.respuesta1,
                        id: "A",
                      },
                      {
                        enunciadoRespuesta: preguntaBuscada.respuesta2,
                        id: "B",
                      },
                      {
                        enunciadoRespuesta: "No se la respuesta a esta pregunta",
                        id: "D",
                      },
                    ],
                  });
                });
                return res.status(200).send({
                  estado: "Exito",
                  message: util.format("Preguntas obtenidas"),
                  data: Object.assign(estructuraPregunta),
                });
              }
            }
          );
        }
      );
    };
    obtener(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}

function buscarPreguntasPorID(req, res) {
  try {
    var obtener = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);
      await Pregunta_w.findOne(
        { numero_pregunta: dec.id },
        (err, preguntaBuscada) => {
          if (err) {
            return res.status(603).send({
              estado: "Error",
              message: util.format(
                "Ocurrió un error al buscar la pregunta en el servidor"
              ),
              data: Object.assign({}),
            });
          }
          if (!preguntaBuscada) {
            return res.status(603).send({
              estado: "Error",
              message: util.format(
                "No se encontró una pregunta con el número ingresado"
              ),
              data: Object.assign({}),
            });
          } else {
            return res.status(200).send({
              estado: "Exito",
              message: util.format("Pregunta obtenida"),
              data: Object.assign(preguntaBuscada),
            });
          }
        }
      );
    };
    obtener(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}

function agregarPregunta(req, res) {
  try {
    var agregar = async (req, res) => {
      try {
        var obtener = tools.decryptJson(req.body.data);
        var pregunta = obtener.pregunta;
        console.log(pregunta);

        Pregunta_w.insertMany(pregunta, (error, pregunta) => {
          if (error) {
            console.log(error);
            return res.status(603).send({
              estado: "Pregunta no registrada",
              message: util.format(
                "Ya se ha registrado una pregunta con el número de pregunta ingresado"
              ),
              data: Object.assign({}),
            });
          }
          if (!pregunta) {
            console.log(error);
            return res.status(604).send({
              estado: "Pregunta no registrada",
              message: util.format(
                "Se presentó un error registrando la pregunta"
              ),
              data: Object.assign({}),
            });
          }

          return res.status(200).send({
            estado: "Pregunta agregada",
            message: util.format("La pregunta ha sido registrada con exito"),
            data: Object.assign({}),
          });
        });
      } catch (error) {
        console.log(error);
        return res.status(602).send({
          estado: "Pregunta no registrada",
          message: util.format("Se presentó un error registrando la pregunta"),
          data: Object.assign({}),
        });
      }
    };
    agregar(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function obtenerPreguntasNuevas(req, res) {
  try {
    var preguntas_wo = [];
    var traer = async (req, res) => {
      await Pregunta_w.find((error, preguntas) => {
        if (error) {
          return res.status(603).json(error);
        }
        if (!preguntas) {
          return res.status(603).json(error);
        }
        preguntas_wo = preguntas;
        return res.status(200).send({
          estado: "preguntas",
          message: util.format("listado de preguntas"),
          data: Object.assign(preguntas_wo),
        });
      });
    };
    traer(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}
