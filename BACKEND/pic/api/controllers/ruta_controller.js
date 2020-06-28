"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
const ruta = require("../../models/ruta_aprendizaje.model");
const curso = require("../../models/curso.model");
const usuarios = require("../../models/user_j.model");
var tools = require("../utils/tools.js");
const cuestionarioHandler = require("../../models/Cuestionario.model");
const PreguntasHandler = require("../../models/preguntas_w.model");
const cursoHandler = require("../../models/curso.model");

module.exports = {
  estadisticaCurso: estadisticaCurso,
};

function generarRutaAprendizaje(req, res) {
  try {
    var cursos = async (req, res) => {
      console.log(req.body);
      var dec = tools.decryptJson(req.body.data);
      var comptetenciasNivel5 = [];
      var comptetenciasNivel4 = [];
      var comptetenciasNivel3 = [];
      var comptetenciasNivel2 = [];
      var comptetenciasNivel1 = [];
      var listado_cursos_basicos = [];
      var listado_cursos_medios = [];
      var listado_cursos_altos = [];
      var listado_cursos_superiores = [];
      var listadoPreguntas = [];
      var listadoCursos = [];

      cuestionarioHandler.findOne(
        { email: dec.email },
        (err, cuestionarioBuscado) => {
          if (err) {
            return res.status(603).send({
              estado: "error",
              message: util.format(err),
              data: Object.assign({}),
            });
          }
          if (!cuestionarioBuscado) {
            return res.status(603).send({
              estado: "Error",
              message: "Cuestionario no encontrado.",
              data: Object.assign({}),
            });
          } else {
            cuestionarioBuscado.listado_preguntas.forEach((pregunta) => {
              listadoPreguntas.push(pregunta.id_pregunta);
            });
            PreguntasHandler.find(
              { id_pregunta: { $in: listadoPreguntas } },
              (err, listadoPreguntas) => {
                var cursoTemporal = {};
                cuestionarioBuscado.listado_cursos.forEach((cursoElegido) => {
                  cursoTemporal = {
                    nivelElegido: null,
                    idCurso: cursoElegido.idCurso,
                  };
                  listadoPreguntas.forEach((preguntaCompleta) => {
                    if (cursoElegido.idCurso == preguntaCompleta.codificacion) {
                      switch (preguntaCompleta.nivel) {
                        case "BÁSICO":
                          cuestionarioBuscado.listado_preguntas.forEach(
                            (pregunta) => {
                                if(cursoTemporal.nivelElegido==null){
                                    if(preguntaCompleta.numero_pregunta == pregunta.codificacion){
                                        if(preguntaCompleta.clave == pregunta.valor_respuesta){
                                            listado_cursos_basicos.push({
                                                numero_curso: String,
                                                nombreCurso: String,
                                                colorEstado: String,
                                                estado_curso: {
                                                    type: String,
                                                    default: 'Por Cursar' //Por Cursar , Cursando, Cursado
                                                }
                                            })
                                        }
                                    }
                                }
                                
                            }
                          );

                          break;
                        case "MEDIO":
                          cursoTemporal.listadoPreguntasMedio.push(
                            preguntaCompleta
                          );  
                          
                          break;
                        case "ALTO":
                          cursoTemporal.listadoPreguntasAlto.push(
                            preguntaCompleta
                          );
                          break;
                        case "SUPERIOR":
                          cursoTemporal.listadoPreguntasSuperior.push(
                            preguntaCompleta
                          );
                          break;
                      }
                    }
                  });
                  listadoCursos.push(cursoTemporal);
                });
              }
            );
            cuestionarioBuscado.listado_competencias.forEach(
              (competenciaActual) => {
                switch (competenciaActual.valor_respuesta) {
                  case "5":
                    comptetenciasNivel5.push({
                      nombreCompetencia: competenciaActual.nombreCompetencia,
                      valor_respuesta: competenciaActual.valor_respuesta,
                    });
                    break;
                  case "4":
                    comptetenciasNivel4.push({
                      nombreCompetencia: competenciaActual.nombreCompetencia,
                      valor_respuesta: competenciaActual.valor_respuesta,
                    });
                    break;
                  case "3":
                    comptetenciasNivel3.push({
                      nombreCompetencia: competenciaActual.nombreCompetencia,
                      valor_respuesta: competenciaActual.valor_respuesta,
                    });
                    break;
                  case "2":
                    comptetenciasNivel2.push({
                      nombreCompetencia: competenciaActual.nombreCompetencia,
                      valor_respuesta: competenciaActual.valor_respuesta,
                    });
                    break;
                  case "1":
                    comptetenciasNivel1.push({
                      nombreCompetencia: competenciaActual.nombreCompetencia,
                      valor_respuesta: competenciaActual.valor_respuesta,
                    });
                    break;
                  default:
                    break;
                }
              }
            );
          }
        }
      );
    };
    cursos(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function estadisticaCompetencia(req, res) {
  try {
    var cursos = async (req, res) => {
      ruta.find((err, rutas) => {
        if (err) {
          return res.status(603).send({
            estado: "error",
            message: util.format(err),
            data: Object.assign({}),
          });
        }
        if (!rutas) {
          return res.status(200).send({
            estado: "No hay rutas",
            message: util.format("No hay rutas"),
            data: Object.assign({}),
          });
        }
        var poblacion = 0;
        usuarios.find((err, usuarios) => {
          if (err) {
            console.log(err);
          }
          poblacion = usuarios.length;
          curso.find((err, cursosListado) => {
            let listaEstadisticaCursos = [];
            let cursando = 0;
            let porCursar = 0;
            if (err) {
              return res.status(603).send({
                estado: "error",
                message: util.format(err),
                data: Object.assign({}),
              });
            }
            if (!cursosListado) {
              return res.status(200).send({
                estado: "No hay cursos",
                message: util.format("No hay cursos"),
                data: Object.assign({}),
              });
            }
            cursosListado.forEach((element) => {
              rutas.forEach((rutaActual) => {
                rutaActual.listado_competencias.forEach((competenciaActual) => {
                  competenciaActual.listado_cursos_basicos.forEach(
                    (cursoActual) => {
                      if (element.consecutivo == cursoActual.numero_curso) {
                        if (
                          cursoActual.estado_curso == "Cursando" ||
                          cursoActual.estado_curso == "Por Cursar"
                        ) {
                          if (cursoActual.estado_curso == "Cursando") {
                            cursando++;
                          } else if (cursoActual.estado_curso == "Por Cursar") {
                            porCursar++;
                          }
                        }
                      }
                    }
                  );
                });
              });
              var estadisticaCursos = {
                numero_curso: element.consecutivo,
                cursando_curso: cursando,
                pendiente_curso: porCursar,
                poblacion_total: poblacion,
              };
              listaEstadisticaCursos.push(estadisticaCursos);
              cursando = 0;
              porCursar = 0;
            });
            return res.status(200).send({
              estado: "Listado cursos con cursando y por cursas",
              message: util.format("Listado cursos con cursando y por cursas"),
              data: Object.assign(listaEstadisticaCursos),
            });
          });
        });
      });
    };
    cursos(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function estadisticaCurso(req, res) {
  try {
    var cursos = async (req, res) => {
      ruta.find((err, rutas) => {
        if (err) {
          return res.status(603).send({
            estado: "error",
            message: util.format(err),
            data: Object.assign({}),
          });
        }
        if (!rutas) {
          return res.status(200).send({
            estado: "No hay rutas",
            message: util.format("No hay rutas"),
            data: Object.assign({}),
          });
        }
        var poblacion = 0;
        usuarios.find((err, usuarios) => {
          if (err) {
            console.log(err);
          }
          poblacion = usuarios.length;
          curso.find((err, cursosListado) => {
            let listaEstadisticaCursos = [];
            let cursando = 0;
            let porCursar = 0;
            if (err) {
              return res.status(603).send({
                estado: "error",
                message: util.format(err),
                data: Object.assign({}),
              });
            }
            if (!cursosListado) {
              return res.status(200).send({
                estado: "No hay cursos",
                message: util.format("No hay cursos"),
                data: Object.assign({}),
              });
            }
            cursosListado.forEach((element) => {
              rutas.forEach((rutaActual) => {
                rutaActual.listado_competencias.forEach((competenciaActual) => {
                  competenciaActual.listado_cursos_basicos.forEach(
                    (cursoActual) => {
                      if (element.consecutivo == cursoActual.numero_curso) {
                        if (
                          cursoActual.estado_curso == "Cursando" ||
                          cursoActual.estado_curso == "Por Cursar"
                        ) {
                          if (cursoActual.estado_curso == "Cursando") {
                            cursando++;
                          } else if (cursoActual.estado_curso == "Por Cursar") {
                            porCursar++;
                          }
                        }
                      }
                    }
                  );
                  competenciaActual.listado_cursos_medios.forEach(
                    (cursoActual) => {
                      if (element.consecutivo == cursoActual.numero_curso) {
                        if (
                          cursoActual.estado_curso == "Cursando" ||
                          cursoActual.estado_curso == "Por Cursar"
                        ) {
                          if (cursoActual.estado_curso == "Cursando") {
                            cursando++;
                          } else if (cursoActual.estado_curso == "Por Cursar") {
                            porCursar++;
                          }
                        }
                      }
                    }
                  );
                  competenciaActual.listado_cursos_altos.forEach(
                    (cursoActual) => {
                      if (element.consecutivo == cursoActual.numero_curso) {
                        if (
                          cursoActual.estado_curso == "Cursando" ||
                          cursoActual.estado_curso == "Por Cursar"
                        ) {
                          if (cursoActual.estado_curso == "Cursando") {
                            cursando++;
                          } else if (cursoActual.estado_curso == "Por Cursar") {
                            porCursar++;
                          }
                        }
                      }
                    }
                  );
                });
              });
              var estadisticaCursos = {
                numero_curso: element.consecutivo,
                cursando_curso: cursando,
                pendiente_curso: porCursar,
                poblacion_total: poblacion,
              };
              listaEstadisticaCursos.push(estadisticaCursos);
              cursando = 0;
              porCursar = 0;
            });
            return res.status(200).send({
              estado: "Listado cursos con cursando y por cursas",
              message: util.format("Listado cursos con cursando y por cursas"),
              data: Object.assign(listaEstadisticaCursos),
            });
          });
        });
      });
    };
    cursos(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}
