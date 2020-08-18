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
const rutaHandler = require("../../models/ruta_aprendizaje.model");

module.exports = {
  estadisticaCurso: estadisticaCurso,
  generarRutaAprendizaje: generarRutaAprendizaje,
  obtenerRutaAprendizaje: obtenerRutaAprendizaje,
};

function cursoNivel(req, res) {
  try {
    var dec = tools.decryptJson(req.body.data);
    var listado = async (req, res) => {
      cuestionarioHandler.find(
        { estado_cuestionario: dec.estado_cuestionario },
        (err, cuestionarios) => {
          if (err) {
            return res.status(603).send({
              estado: "error",
              message: util.format(err),
              data: Object.assign({}),
            });
          }
          if (!cuestionarios) {
            return res.status(200).send({
              estado: "No Hay Cuestionarios Completados",
              message: util.format("No Hay Cuestionarios Completados"),
              data: Object.assign({}),
            });
          }
        }
      );
    };
    listado(req, res);
  } catch (error) {}
}

function obtenerRutaAprendizaje(req, res) {
  try {
    var dec = tools.decryptJson(req.body.data);

    var listado = async (req, res) => {
      rutaHandler.findOne({ email: dec.email }, (err, ruta) => {
        if (err) {
          return res.status(603).send({
            estado: "error",
            message: util.format(err),
            data: Object.assign({}),
          });
        }
        if (!ruta) {
          return res.status(603).send({
            estado: "Error",
            message: util.format(
              "No Hay Ruta de Aprendizaje para este usuario"
            ),
            data: Object.assign({}),
          });
        }
        var rutaUltimate = [];

        ruta.listado_competencias.forEach((competencia) => {
          if (competencia.valor_respuesta != "0") {
            rutaUltimate.push(competencia);
          }
        });
        ruta.listado_competencias = rutaUltimate;
        ruta.listado_competencias.sort(function (a, b) {
          if (a.valor_respuesta > b.valor_respuesta) {
            return -1;
          }
          if (a.valor_respuesta < b.valor_respuesta) {
            return 1;
          }
          return 0;
        });

        return res.status(200).send({
          estado: "Exito",
          message: util.format("Ruta Obtenida"),
          data: Object.assign(ruta),
        });
      });
    };
    listado(req, res);
  } catch (error) {}
}

function generarRutaAprendizaje(req, res) {
  try {
    var cursos = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);
      const colorPorCursar = "#F0D133"
      const colorCursando = "#65B1D9"
      const colorAprobado = "#63bc5f"

      var ruta_aprendizaje = {
        id_ruta: dec.email,
        email: dec.email,
        estado_ruta: "Aprobada",
        listado_competencias: [],
      };
      var listado_competencias_validas = [];
      var listadoPreguntas = [];

      usuarios.findOne({ email: dec.email }, (err, user) => {
        if (err) {
          return res.status(601).send({
            estado: "Error",
            message: util.format(err),
            data: Object.assign({}),
          });
        }
        if (!user) {
          return res.status(601).send({
            estado: "Error",
            message: util.format("Usuario no existe"),
            data: Object.assign({}),
          });
        }
        ruta_aprendizaje.identificacion = user.identificacion;
        rutaHandler.findOne({ email: dec.email }, (err, ruta) => {
          if (err) {
            return res.status(603).send({
              estado: "error",
              message: util.format(err),
              data: Object.assign({}),
            });
          }
          if (ruta) {
            return res.status(200).send({
              estado: "Error",
              message: util.format(
                "El usuario ya cuenta con una ruta de Aprendizaje generada"
              ),
              data: Object.assign({}),
            });
          }

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
                cuestionarioBuscado.listado_competencias.forEach(
                  (competencia) => {
                    if (competencia.valor_respuesta != "0") {
                      ruta_aprendizaje.listado_competencias.push({
                        nombreCompetencia: competencia.nombreCompetencia,
                        valor_respuesta: competencia.valor_respuesta,
                        categorizada: "",
                        listado_cursos_basicos: [],
                        listado_cursos_medios: [],
                        listado_cursos_altos: [],
                        listado_cursos_superiores: [],
                      });
                      listado_competencias_validas.push(
                        competencia.nombreCompetencia
                      );
                    }
                  }
                );
                cuestionarioBuscado.listado_preguntas.forEach((pregunta) => {
                  listadoPreguntas.push(pregunta.id_pregunta);
                });
                cursoHandler.find(
                  { competencia: { $in: listado_competencias_validas } },
                  (err, cursosEncontrados) => {
                    if (err) {
                      return res.status(603).send({
                        estado: "error",
                        message: util.format(err),
                        data: Object.assign({}),
                      });
                    }
                    if (!cursosEncontrados) {
                      return res.status(603).send({
                        estado: "Error",
                        message: "Cursos no encontrado.",
                        data: Object.assign({}),
                      });
                    }

                    ruta_aprendizaje.listado_competencias.forEach(
                      (competencia) => {
                        cursosEncontrados.forEach((cursoEncontrado) => {
                          if (
                            competencia.nombreCompetencia ==
                            cursoEncontrado.competencia
                          ) {
                            switch (cursoEncontrado.nivel_ruta) {
                              case "BÁSICO":
                                competencia.listado_cursos_basicos.push({
                                  idCurso: cursoEncontrado.consecutivo,
                                  nombreCurso: cursoEncontrado.nombre_actividad,
                                  colorEstado: "#65B1D9", //success - #65B1D9 - #F0D133
                                  estado: "Cursando", // Por Cursar - Cursando - Aprobado
                                });
                                break;
                              case "MEDIO":
                                competencia.listado_cursos_medios.push({
                                  idCurso: cursoEncontrado.consecutivo,
                                  nombreCurso: cursoEncontrado.nombre_actividad,
                                  colorEstado: "#F0D133", //#63bc5f - #65B1D9 - #F0D133
                                  estado: "Por Cursar", // Por Cursar - Cursando - Aprobado
                                });
                                break;
                              case "ALTO":
                                competencia.listado_cursos_altos.push({
                                  idCurso: cursoEncontrado.consecutivo,
                                  nombreCurso: cursoEncontrado.nombre_actividad,
                                  colorEstado: "#F0D133",
                                  estado: "Por Cursar",
                                });
                                break;
                              case "SUPERIOR":
                                competencia.listado_cursos_superiores.push({
                                  idCurso: cursoEncontrado.consecutivo,
                                  nombreCurso: cursoEncontrado.nombre_actividad,
                                  colorEstado: "#F0D133",
                                  estado: "Por Cursar",
                                });
                                break;
                            }
                          }
                        });
                      }
                    );

                    PreguntasHandler.find(
                      { numero_pregunta: { $in: listadoPreguntas } },
                      (err, preguntasEncontradas) => {
                        if (err) {
                          return res.status(603).send({
                            estado: "error",
                            message: util.format(err),
                            data: Object.assign({}),
                          });
                        }
                        if (!preguntasEncontradas) {
                          return res.status(603).send({
                            estado: "Error",
                            message: "Preguntas no encontradas.",
                            data: Object.assign({}),
                          });
                        }

                        listadoPreguntas.forEach((preguntaBasica) => {
                          preguntasEncontradas.forEach((preguntaCompleta) => {
                            if (
                              preguntaBasica.id_pregunta ==
                              preguntaCompleta.numero_pregunta
                            ) {
                              preguntaBasica.competencia =
                                preguntaCompleta.competencia;
                              preguntaBasica.nivel = preguntaCompleta.nivel;

                              if (
                                preguntaBasica.valor_respuesta ==
                                preguntaCompleta.clave
                              ) {
                                preguntaBasica.respuesta = "Correcta";
                              } else {
                                preguntaBasica.respuesta = "Incorrecta";
                              }
                            }
                          });
                        });

                        ruta_aprendizaje.listado_competencias.forEach(
                          (competencia) => {
                            listadoPreguntas.forEach((preguntaEncontrada) => {
                              if (
                                competencia.nombreCompetencia ==
                                preguntaEncontrada.competencia
                              ) {
                                switch (preguntaEncontrada.nivel) {
                                  case "BÁSICO":
                                    if (competencia.categorizada != "") {
                                      if (
                                        preguntaEncontrada.respuesta ==
                                        "Incorrecta"
                                      ) {
                                        competencia.categorizada =
                                          "Categorizada";
                                        competencia.listado_cursos_basicos.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#65B1D9";
                                            cursosCambiar.estado = "Cursando";
                                          }
                                        );
                                        competencia.listado_cursos_medios.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#F0D133";
                                            cursosCambiar.estado = "Por Cursar";
                                          }
                                        );
                                        competencia.listado_cursos_altos.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#F0D133";
                                            cursosCambiar.estado = "Por Cursar";
                                          }
                                        );
                                        competencia.listado_cursos_superiores.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#F0D133";
                                            cursosCambiar.estado = "Por Cursar";
                                          }
                                        );
                                      } else {
                                        competencia.listado_cursos_basicos.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#63bc5f";
                                            cursosCambiar.estado = "Aprobado";
                                          }
                                        );
                                      }
                                    }
                                    break;
                                  case "MEDIO":
                                    if (competencia.categorizada != "") {
                                      if (
                                        preguntaEncontrada.respuesta ==
                                        "Incorrecta"
                                      ) {
                                        competencia.categorizada =
                                          "Categorizada";
                                        competencia.listado_cursos_medios.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#65B1D9";
                                            cursosCambiar.estado = "Cursando";
                                          }
                                        );
                                        competencia.listado_cursos_altos.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#F0D133";
                                            cursosCambiar.estado = "Por Cursar";
                                          }
                                        );
                                        competencia.listado_cursos_superiores.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#F0D133";
                                            cursosCambiar.estado = "Por Cursar";
                                          }
                                        );
                                      } else {
                                        competencia.listado_cursos_basicos.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#63bc5f";
                                            cursosCambiar.estado = "Aprobado";
                                          }
                                        );
                                      }
                                    }
                                    break;
                                  case "ALTO":
                                    if (competencia.categorizada != "") {
                                      if (
                                        preguntaEncontrada.respuesta ==
                                        "Incorrecta"
                                      ) {
                                        competencia.categorizada =
                                          "Categorizada";
                                        competencia.listado_cursos_altos.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#65B1D9";
                                            cursosCambiar.estado = "Cursando";
                                          }
                                        );
                                        competencia.listado_cursos_superiores.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#F0D133";
                                            cursosCambiar.estado = "Por Cursar";
                                          }
                                        );
                                      } else {
                                        competencia.listado_cursos_basicos.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#63bc5f";
                                            cursosCambiar.estado = "Aprobado";
                                          }
                                        );
                                      }
                                    }
                                    break;
                                  case "SUPERIOR":
                                    if (competencia.categorizada != "") {
                                      if (
                                        preguntaEncontrada.respuesta ==
                                        "Incorrecta"
                                      ) {
                                        competencia.categorizada =
                                          "Categorizada";
                                        competencia.listado_cursos_superiores.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#65B1D9";
                                            cursosCambiar.estado = "Cursando";
                                          }
                                        );
                                      } else {
                                        competencia.listado_cursos_basicos.forEach(
                                          (cursosCambiar) => {
                                            cursosCambiar.colorEstado =
                                              "#63bc5f";
                                            cursosCambiar.estado = "Aprobado";
                                          }
                                        );
                                      }
                                    }
                                    break;
                                }
                              }
                            });
                          }
                        );
                        var Ruta = rutaHandler(ruta_aprendizaje);
                        Ruta.save((err, rutaCreada) => {
                          if (err) {
                            return res.status(601).send({
                              estado: "Error",
                              message: util.format(err),
                              data: Object.assign({}),
                            });
                          }
                          if (!rutaCreada) {
                            return res.status(601).send({
                              estado: "Error",
                              message: util.format(
                                "Error al crear la ruta de aprendizaje"
                              ),
                              data: Object.assign({}),
                            });
                          }
                          return res.status(200).send({
                            estado: "Exito",
                            message: "Ruta generada con Exito",
                            data: Object.assign({ ruta_aprendizaje }),
                          });
                        });
                      }
                    );
                  }
                );
              }
            }
          );
        });
      });
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
            return res.status(640).send({
              estado: "error",
              message: "error",
              data: Object.assign(err),
            });
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
            return res.status(640).send({
              estado: "error",
              message: "error",
              data: Object.assign(err),
            });
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
