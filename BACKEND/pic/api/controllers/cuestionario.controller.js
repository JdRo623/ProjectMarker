"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
var tools = require("../utils/tools.js");
const cuestionarioHandler = require("../../models/Cuestionario.model");
const usuario = require("../../models/user_j.model");
const subgrupo = require("../../models/subdireccion.model");
const coordinacion = require("../../models/coordinacion.model");
const cursoHandler = require("../../models/curso.model");
const PreguntasHandler = require("../../models/preguntas_w.model");
const preguntas_seccionIII = require("../utils/preguntasSeccionIII.js");
const user_jModel = require("../../models/user_j.model");
const { ftruncate } = require("fs");

module.exports = {
  Cuestionario: Cuestionario,
  completadas: completadas,
  actualizarCompetencia: actualizarCompetencia,
  actualizarPregunta: actualizarPregunta,
  actualizarEstadoCuestionario: actualizarEstadoCuestionario,
  buscarCuestionarioCorreo: buscarCuestionarioCorreo,
  CuestionarioConsulta: CuestionarioConsulta,
  actualizarPreguntaIII: actualizarPreguntaIII,
  cuestionarioSinCompletar: cuestionarioSinCompletar,
  listadoHomologacion: listadoHomologacion,
};

function actualizarPreguntaIII(req, res) {
  try {
    var actu = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);
      cuestionarioHandler.findOne(
        { email: dec.data.email },
        (err, cuestionarioBuscado) => {
          if (err) {
            return res.status(640).send({
              estado: "error",
              message: "error",
              data: Object.assign(err),
            });
          }
          if (!cuestionarioBuscado) {
            return res.status(200).send({
              estado: "cuestionario no encontrado",
              message: util.format("cuestionario no encontrado"),
              data: Object.assign({}),
            });
          }
          cuestionarioBuscado.listado_preguntas_seccion_iii.forEach(
            (preguntaBuscada) => {
              if (preguntaBuscada.id_pregunta == dec.data.id_pregunta) {
                preguntaBuscada.valor_respuesta = dec.data.valor_respuesta;
                preguntaBuscada.estado_preguntas = dec.data.estado_respuesta;
              }
            }
          );
          cuestionarioHandler
            .updateOne({ email: dec.data.email }, cuestionarioBuscado)
            .then(() => {
              return res.status(200).send({
                estado: "Pregunta III Actualizada",
                message: util.format("Pregunta III Actualizada"),
                data: Object.assign(cuestionarioBuscado),
              });
            });
        }
      );
    };
    actu(req, res);
  } catch (error) {}
}

function buscarCuestionarioCorreo(req, res) {
  try {
    var buscar = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);

      cuestionarioHandler.findOne(
        { email: dec.email },
        (err, cuestionarioBuscado) => {
          if (err) {
            return res.status(640).send({
              estado: "error",
              message: "error",
              data: Object.assign(err),
            });
          }
          if (!cuestionarioBuscado) {
            return res.status(200).send({
              estado: "Validación de cuestionario realizada",
              message: util.format(
                "No existe el cuestionario, iniciando nuevo cuestionario"
              ),
              data: Object.assign({}),
            });
          }
          var listado_competencias = [];
          var listado_preguntas = [];
          var listado_preguntas_seccion_iii = [];

          cuestionarioBuscado.listado_competencias.forEach((competencia) => {
            if (competencia.estado_respuesta == "No respondida") {
              listado_competencias.push(competencia);
            }
          });

          cuestionarioBuscado.listado_preguntas.forEach((pregunta) => {
            if (pregunta.estado_respuesta == "No respondida") {
              listado_preguntas.push(pregunta);
            }
          });

          cuestionarioBuscado.listado_preguntas_seccion_iii.forEach(
            (pregunta) => {
              if (pregunta.estado_preguntas == "No respondida") {
                listado_preguntas_seccion_iii.push(pregunta);
              }
            }
          );

          cuestionarioBuscado.listado_competencias = listado_competencias;
          cuestionarioBuscado.listado_preguntas = listado_preguntas;
          cuestionarioBuscado.listado_preguntas_seccion_iii = listado_preguntas_seccion_iii;
          return res.status(200).send({
            estado: "Validación de cuestionario realizada",
            message: util.format(
              "Podrás continuar el cuestionario desde donde lo dejaste"
            ),
            data: Object.assign(cuestionarioBuscado),
          });
        }
      );
    };
    buscar(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}

function actualizarEstadoCuestionario(req, res) {
  try {
    var actualizando = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);
      var respondido = true;
      cuestionarioHandler.findOne(
        { email: dec.data.email },
        (err, cuestionarioBuscado) => {
          if (err) {
            return res.status(640).send({
              estado: "error",
              message: "error",
              data: Object.assign(err),
            });
          }
          if (!cuestionarioBuscado) {
            return res.status(601).send({
              estado: "No existe el cuestionario",
              message: util.format("no existe el cuestionario"),
            });
          }

          if (respondido) {
            cuestionarioBuscado.listado_competencias.forEach((element) => {
              if (element.estado_respuesta != "Respondida") {
                respondido = false;
                break;
              }
            });
          }
          if (respondido) {
            cuestionarioBuscado.listado_preguntas.forEach((element) => {
              if (element.estado_respuesta != "Respondida") {
                respondido = false;
                break;
              }
            });
          }
          if (respondido) {
            cuestionarioBuscado.listado_preguntas_seccion_iii.forEach(
              (element) => {
                if (element.estado_respuesta != "Respondida") {
                  respondido = false;
                  break;
                }
              }
            );
          }

          if (respondido) {
            cuestionarioBuscado.estado_cuestionario = "Respondido";
            cuestionarioHandler
              .updateOne({ email: dec.data.email }, cuestionarioBuscado)
              .then(() => {
                return res.status(200).send({
                  estado: "Exito",
                  message: util.format("cuestionario actualizado"),
                  data: Object.assign(cuestionarioBuscado),
                });
              });
          } else {
            return res.status(200).send({
              estado: "no se actualizo cuestionario",
              message: util.format("no se han respondido todos los campos"),
              data: Object.assign(cuestionarioBuscado),
            });
          }
        }
      );
    };
    actualizando(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}

function actualizarPregunta(req, res) {
  try {
    var actualizando = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);

      cuestionarioHandler.findOne(
        { email: dec.data.email },
        (err, cuestionarioBuscado) => {
          if (err) {
            return res.status(601).send({
              estado: "No existe el cuestionario",
              message: util.format("no existe el cuestionario"),
              data: Object.assign(err),
            });
          }
          if (!cuestionarioBuscado) {
            return res.status(601).send({
              estado: "No existe el cuestionario",
              message: util.format("no existe el cuestionario"),
              data: Object.assign({}),
            });
          }
          cuestionarioBuscado.listado_preguntas.forEach((element) => {
            if (element.id_pregunta == dec.data.id_pregunta) {
              element.valor_respuesta = dec.data.valor_respuesta;
              element.estado_respuesta = dec.data.estado_respuesta;
            }
          });
          cuestionarioHandler
            .updateOne({ email: dec.data.email }, cuestionarioBuscado)
            .then(() => {
              return res.status(200).send({
                estado: "Exito",
                message: util.format("cuestionario actualizado"),
                data: Object.assign(cuestionarioBuscado),
              });
            });
        }
      );
    };
    actualizando(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}

function actualizarCompetencia(req, res) {
  try {
    var actualizando = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);

      cuestionarioHandler.findOne(
        { email: dec.data.email },
        (err, cuestionarioBuscado) => {
          if (err) {
            return res.status(601).send({
              estado: "No existe el cuestionario",
              message: util.format("no existe el cuestionario"),
              data: Object.assign(err),
            });
          }
          if (!cuestionarioBuscado) {
            return res.status(601).send({
              estado: "No existe el cuestionario",
              message: util.format("no existe el cuestionario"),
              data: Object.assign({}),
            });
          }

          cuestionarioBuscado.listado_competencias.forEach((element) => {
            if (element.nombreCompetencia == dec.data.competencia) {
              element.valor_respuesta = dec.data.valor_respuesta;
              element.estado_respuesta = dec.data.estado_respuesta;
            }
          });
          cuestionarioHandler
            .updateOne({ email: dec.data.email }, cuestionarioBuscado)
            .then(() => {
              return res.status(200).send({
                estado: "Exito",
                message: util.format("Cuestionario Actualizado"),
                data: Object.assign(cuestionarioBuscado),
              });
            });
        }
      );
    };
    actualizando(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}

function listadoHomologacion(req, res) {
  try {
    var dec = tools.decryptJson(req.body.data);
    var homologados = [];
    var listado = async (req, res) => {
      cuestionarioHandler.find(
        { estado_cuestionario: dec.estado_cuestionario },
        (err, cuestionarios) => {
          if (err) {
            return res.status(640).send({
              estado: "error",
              message: "error",
              data: Object.assign(err),
            });
          }
          if (!cuestionarios) {
            return res.status(200).send({
              estado: "No hay cuestionarios sin responder",
              message: "No hay cuestionarios sin responder",
              data: Object.assign({}),
            });
          }
          for (let i = 0; i < cuestionarios.length; i++) {
            let datosFaltantes = {
              usuario: "",
            };
            usuario
              .findOne({ email: cuestionarios[i].email })
              .then((usuarioBuscado) => {
                datosFaltantes.usuario = usuarioBuscado;
              });
            homologados.push(datosFaltantes);
          }

          return res.status(200).send({
            estado: "lista de homologados",
            message: "lista de homologados",
            data: Object.assign(homologados),
          });
        }
      );
    };
    listado(req, res);
  } catch (error) {}
}

function cuestionarioSinCompletar(req, res) {
  try {
    var dec = tools.decryptJson(req.body.data);
    var incompletos = [];
    var listado = async (req, res) => {
      cuestionarioHandler.find(
        { estado_cuestionario: dec.estado_cuestionario },
        (err, cuestionarios) => {
          if (err) {
            return res.status(640).send({
              estado: "error",
              message: "error",
              data: Object.assign(err),
            });
          }
          if (!cuestionarios) {
            return res.status(200).send({
              estado: "No hay cuestionarios sin responder",
              message: "No hay cuestionarios sin responder",
              data: Object.assign({}),
            });
          }
          for (let i = 0; i < cuestionarios.length; i++) {
            let date = new Date();
            let datosFaltantes = {
              fechaReporte:
                date.getFullYear() +
                "-" +
                date.getMonth() +
                "-" +
                date.getDay(),
              horaReporte:
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds(),
              usuario: "",
            };
            usuario
              .findOne({ email: cuestionarios[i].email })
              .then((usuariobuscado) => {
                let usuarioEncontrado = {};
                if (!usuariobuscado) {
                  usuarioEncontrado = "Usuario sin identificar";
                } else {
                  usuarioEncontrado = {
                    nombres: tools.decrypt(usuariobuscado.nombres),
                    apellidos: tools.decrypt(usuariobuscado.apellidos),
                    nombres_jefe: tools.decrypt(usuariobuscado.nombres_jefe),
                    apellidos_jefe: tools.decrypt(
                      usuariobuscado.apellidos_jefe
                    ),
                    email: usuariobuscado.email,
                    identificacion: tools.decrypt(
                      usuariobuscado.identificacion
                    ),
                    ciudad: tools.decrypt(usuariobuscado.ciudad),
                    cargo: tools.decrypt(usuariobuscado.cargo),
                    descripccion_cargo: tools.decrypt(
                      usuariobuscado.descripccion_cargo
                    ),
                  };
                }
                console.log(usuarioEncontrado, "usuario");
                datosFaltantes.usuario = usuarioEncontrado;
              });
            incompletos.push(datosFaltantes);
          }
          console.log(incompletos);
          return res.status(200).send({
            estado: "lista de cuestionarios por completar",
            message: "lista de cuestionarios por completar",
            data: Object.assign(incompletos),
          });
        }
      );
    };
    listado(req, res);
  } catch (error) {}
}

function completadas(req, res) {
  try {
    var traer = async (req, res) => {
      var respondidas = 0;
      var noRespondidas = 0;
      cuestionarioHandler.find((err, cuestionarios) => {
        if (err) {
          return res.status(640).send({
            estado: "error",
            message: "error",
            data: Object.assign(err),
          });
        }
        if (!cuestionarios) {
          return res.status(200).send({
            estado: "No Hay Cuestionarios",
            message: util.format(err),
          });
        }
        cuestionarios.forEach((element) => {
          console.log(element);
          if (element.estado_cuestionario == "Pendiente") {
            noRespondidas++;
          } else {
            respondidas++;
          }
        });
        var encuestasRespondidas = {
          resueltas: respondidas,
          norespondidas: noRespondidas,
        };
        return res.status(200).send({
          estado: "Exito",
          message: util.format("contestadas"),
          data: Object.assign(encuestasRespondidas),
        });
      });
    };
    traer(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}
function Cuestionario(req, res) {
  try {
    var agregar = async (req, res) => {
      var newCuestionario;
      var cues = tools.decryptJson(req.body.data);
      var competencias = [];
      var encontrado = false;
      var cursos = [];
      console.log(cues);
      await cuestionarioHandler.findOne(
        { email: cues.email },
        (err, cuestionario) => {
          if (err) {
            return res.status(640).send({
              estado: "error",
              message: "error",
              data: Object.assign(err),
            });
          }
          if (!cuestionario) {
            newCuestionario = {
              id_Cuestionario: cues.email,
              email: cues.email,
              coordinacion: cues.coordinacion,
              rol: cues.rol,
              subgrupo: cues.subgrupo,
              seccional: cues.seccional,
              listado_competencias: [],
              listado_cursos: [],
              listado_preguntas: [],
              listado_preguntas_seccion_iii: [],
              estado_cuestionario: "Pendiente",
            };
            subgrupo.findOne(
              { nombre: cues.subgrupo },
              (err, subgrupoElegido) => {
                if (err) {
                  return res.status(640).send({
                    estado: "error",
                    message: "error",
                    data: Object.assign(err),
                  });
                }

                //console.log(subgrupoElegido)
                if (cues.coordinacio) {
                }
                if (subgrupoElegido.cursos.length != 0) {
                  subgrupoElegido.cursos.forEach((cursoSubGrupo) => {
                    if (cursoSubGrupo.cargos.length != 0) {
                      cursoSubGrupo.cargos.forEach((cargoCurso) => {
                        if (cargoCurso == cues.rol) {
                          //TODO ACTIVAR
                          //cursos.push({ idCurso: cursoCoordinacion.idCurso });
                        }
                      });
                    }
                  });
                }
                coordinacion.findOne(
                  { nombre: cues.coordinacion },
                  (err, coordinacionObtenida) => {
                    if (err) {
                      return res.status(640).send({
                        estado: "error",
                        message: "error",
                        data: Object.assign(err),
                      });
                    }

                    console.log(coordinacionObtenida);
                    cursos = [];
                    //TODO: VALIDACION DE SI SI SELECCIONÓ COORDINACIÓN O GIT
                    if (coordinacionObtenida.cursos.length != 0) {
                      coordinacionObtenida.cursos.forEach(
                        (cursoCoordinacion) => {
                          if (cursoCoordinacion.cargos.length != 0) {
                            cursoCoordinacion.cargos.forEach((cargoCurso) => {
                              if (cargoCurso == cues.rol) {
                                cursos.push(cursoCoordinacion.idCurso);
                              }
                            });
                          }
                        }
                      );
                    }
                    console.log(cursos);

                    cursos.forEach((cursoEspecifico) => {
                      newCuestionario.listado_cursos.push({
                        idCurso: cursoEspecifico,
                      });
                    });

                    cursoHandler.find((err, listadoCursosObtenidos) => {
                      if (err) {
                        return res.status(640).send({
                          estado: "error",
                          message: "error",
                          data: Object.assign(err),
                        });
                      }

                      var competenciasGuardar = [];
                      newCuestionario.listado_cursos.forEach(
                        (cursoEspecifico) => {
                          listadoCursosObtenidos.forEach((cursoObtenido) => {
                            if (
                              cursoObtenido.consecutivo ==
                              cursoEspecifico.idCurso
                            ) {
                              console.log(
                                competencias.includes(cursoObtenido.competencia)
                              );
                              if (
                                !competencias.includes(
                                  cursoObtenido.competencia
                                )
                              ) {
                                competencias.push(cursoObtenido.competencia);
                                competenciasGuardar.push({
                                  nombreCompetencia: cursoObtenido.competencia,
                                  descripcionCompetencia:
                                    cursoObtenido.descripcion_competencia,
                                });
                              }
                            }
                          });
                        }
                      );
                      newCuestionario.listado_competencias = competenciasGuardar;
                      preguntas_seccionIII.preguntasMock.forEach(
                        (preguntaSeccionIII) => {
                          newCuestionario.listado_preguntas_seccion_iii.push({
                            id_pregunta: preguntaSeccionIII.idPregunta,
                          });
                        }
                      );
                      //  newCuestionario.listado_competencias = competencias
                      PreguntasHandler.find(
                        { codificacion: { $in: cursos } },
                        (err, listadoPreguntas) => {
                          listadoPreguntas.forEach((preguntaEspecifica) => {
                            newCuestionario.listado_preguntas.push({
                              id_pregunta: preguntaEspecifica.numero_pregunta,
                            });
                          });
                          console.log(newCuestionario);
                          var CuestionarioGuardar = new cuestionarioHandler(
                            newCuestionario
                          );
                          CuestionarioGuardar.save(
                            (err, cuestionarioCreado) => {
                              if (err) {
                                return res.status(601).send({
                                  estado: "error",
                                  message: util.format(err),
                                  data: Object.assign({}),
                                });
                              }
                              if (cuestionarioCreado) {
                                user_jModel.findOneAndUpdate(
                                  { email: cuestionarioCreado.email },
                                  {
                                    cargo: tools.encrypt(
                                      cuestionarioCreado.rol
                                    ),
                                    nivel3: tools.encrypt(
                                      cuestionarioCreado.subgrupo
                                    ),
                                    nivel2: tools.encrypt(
                                      cuestionarioCreado.seccional
                                    ),
                                    nivel4: tools.encrypt(
                                      cuestionarioCreado.coordinacion
                                    ),
                                  },
                                  function (err, result) {
                                    console.log(err);
                                    console.log(result);
                                    return res.status(200).send({
                                      estado: "Exito",
                                      message: util.format(
                                        "Cuestionario registrado exitosamente"
                                      ),
                                      data: Object.assign(cuestionarioCreado),
                                    });
                                  }
                                );
                              } else {
                                return res.status(601).send({
                                  estado: "Error",
                                  message: util.format(
                                    "No fue posible crear el Cuestionario"
                                  ),
                                  data: Object.assign({}),
                                });
                              }
                            }
                          );
                        }
                      );
                    });
                  }
                );
              }
            );
          } else {
            return res.status(200).send({
              estado: "Ya existe el cuestionario",
              message: util.format("Ya existe el cuestionario"),
              data: Object.assign(cuestionario),
            });
          }
        }
      );
    };
    agregar(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}

function CuestionarioConsulta(req, res) {
  try {
    var agregar = async (req, res) => {
      var newCuestionario;
      var cues = tools.decryptJson(req.body.data);
      var competencias = [];
      var fechaCorreo = "Prueba." + tools.getFechaActual() + "@dian.gov.co";
      var encontrado = false;
      var cursos = [];
      console.log(cues);
      newCuestionario = {
        id_Cuestionario: fechaCorreo,
        email: fechaCorreo,
        coordinacion: cues.coordinacion,
        rol: cues.rol,
        subgrupo: cues.subgrupo,
        seccional: cues.seccional,
        listado_competencias: [],
        listado_cursos: [],
        listado_preguntas: [],
        listado_preguntas_seccion_iii: [],
        estado_cuestionario: "Pendiente",
      };
      subgrupo.findOne({ nombre: cues.subgrupo }, (err, subgrupoElegido) => {
        if (err) {
          return res.status(640).send({
            estado: "error",
            message: "error",
            data: Object.assign(err),
          });
        }

        //console.log(subgrupoElegido)
        if (subgrupoElegido.cursos.length != 0) {
          subgrupoElegido.cursos.forEach((cursoSubGrupo) => {
            if (cursoSubGrupo.cargos.length != 0) {
              cursoSubGrupo.cargos.forEach((cargoCurso) => {
                if (cargoCurso == cues.rol) {
                  //TODO ACTIVAR
                  // cursos.push({ idCurso: cursoCoordinacion.idCurso });
                }
              });
            }
          });
        }
        coordinacion.findOne(
          { nombre: cues.coordinacion },
          (err, coordinacionObtenida) => {
            if (err) {
              return res.status(640).send({
                estado: "error",
                message: "error",
                data: Object.assign(err),
              });
            }

            console.log(coordinacionObtenida);
            cursos = [];
            //TODO: VALIDACION DE SI SI SELECCIONÓ COORDINACIÓN O GIT
            if (coordinacionObtenida.cursos.length != 0) {
              coordinacionObtenida.cursos.forEach((cursoCoordinacion) => {
                if (cursoCoordinacion.cargos.length != 0) {
                  cursoCoordinacion.cargos.forEach((cargoCurso) => {
                    if (cargoCurso == cues.rol) {
                      cursos.push(cursoCoordinacion.idCurso);
                    }
                  });
                }
              });
            }
            console.log(cursos);

            cursos.forEach((cursoEspecifico) => {
              newCuestionario.listado_cursos.push({ idCurso: cursoEspecifico });
            });

            cursoHandler.find((err, listadoCursosObtenidos) => {
              if (err) {
                return res.status(640).send({
                  estado: "error",
                  message: "error",
                  data: Object.assign(err),
                });
              }

              var competenciasGuardar = [];
              newCuestionario.listado_cursos.forEach((cursoEspecifico) => {
                listadoCursosObtenidos.forEach((cursoObtenido) => {
                  if (cursoObtenido.consecutivo == cursoEspecifico.idCurso) {
                    console.log(
                      competencias.includes(cursoObtenido.competencia)
                    );
                    if (!competencias.includes(cursoObtenido.competencia)) {
                      competencias.push(cursoObtenido.competencia);
                      competenciasGuardar.push({
                        nombreCompetencia: cursoObtenido.competencia,
                        descripcionCompetencia:
                          cursoObtenido.descripcion_competencia,
                      });
                    }
                  }
                });
              });
              newCuestionario.listado_competencias = competenciasGuardar;
              preguntas_seccionIII.preguntasMock.forEach(
                (preguntaSeccionIII) => {
                  newCuestionario.listado_preguntas_seccion_iii.push({
                    id_pregunta: preguntaSeccionIII.idPregunta,
                  });
                }
              );
              //  newCuestionario.listado_competencias = competencias
              PreguntasHandler.find(
                { codificacion: { $in: cursos } },
                (err, listadoPreguntas) => {
                  listadoPreguntas.forEach((preguntaEspecifica) => {
                    newCuestionario.listado_preguntas.push({
                      id_pregunta: preguntaEspecifica.numero_pregunta,
                    });
                  });
                  var CuestionarioGuardar = new cuestionarioHandler(
                    newCuestionario
                  );
                  CuestionarioGuardar.save((err, cuestionarioCreado) => {
                    if (err) {
                      return res.status(601).send({
                        estado: "error",
                        message: util.format(err),
                        data: Object.assign({}),
                      });
                    }
                    if (cuestionarioCreado) {
                      // console.log(cuestionarioCreado);
                      newCuestionario = {
                        id_Cuestionario: fechaCorreo,
                        email: fechaCorreo,
                        coordinacion: cues.coordinacion,
                        rol: cues.rol,
                        subgrupo: cues.subgrupo,
                        seccional: cues.seccional,
                        listado_competencias: "",
                        listado_cursos: "",
                        listado_preguntas: "",
                        listado_preguntas_seccion_iii: "",
                        estado_cuestionario: "Pendiente",
                      };
                      var temp = "";
                      cuestionarioCreado.listado_competencias.forEach(
                        (cursoObtenido) => {
                          temp += "" + cursoObtenido.nombreCompetencia + " ";
                        }
                      );
                      newCuestionario.listado_competencias = temp;

                      temp = "";
                      cuestionarioCreado.listado_cursos.forEach(
                        (cursoObtenido) => {
                          temp += "" + cursoObtenido.idCurso + " ";
                        }
                      );
                      newCuestionario.listado_cursos = temp;

                      temp = "";
                      cuestionarioCreado.listado_preguntas.forEach(
                        (cursoObtenido) => {
                          temp += "" + cursoObtenido.id_pregunta + " ";
                        }
                      );
                      newCuestionario.listado_preguntas = temp;

                      temp = "";
                      cuestionarioCreado.listado_preguntas_seccion_iii.forEach(
                        (cursoObtenido) => {
                          temp += "" + cursoObtenido.id_pregunta + " ";
                        }
                      );
                      newCuestionario.listado_preguntas_seccion_iii = temp;
                      console.log(newCuestionario);

                      return res.status(200).send({
                        estado: "Exito",
                        message: util.format(
                          "Cuestionario registrado Exitosamente"
                        ),
                        data: Object.assign(newCuestionario),
                      });
                    } else {
                      return res.status(601).send({
                        estado: "Error",
                        message: util.format(
                          "No fue posible crear el Cuestionario"
                        ),
                        data: Object.assign({}),
                      });
                    }
                  });
                }
              );
            });
          }
        );
      });
    };
    agregar(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}

function traerCompetencias(seccional) {
  console.log(seccional);
  var competencias = [];
  var encontrado = false;
  var cursos = [];
  subgrupo.findOne({ seccional: seccional }, (err, subgrupos) => {
    if (err) {
      return res.status(640).send({
        estado: "error",
        message: "error",
        data: Object.assign(err),
      });
    }
    console.log(subgrupos);
    if (subgrupos.length != 0) {
      subgrupos.array.forEach((element) => {
        cursos.push(element.idCurso);
      });
    }
    coordinacion.findOne({ seccional: seccional }, (err, coordinacion) => {
      if (err) {
        return res.status(640).send({
          estado: "error",
          message: "error",
          data: Object.assign(err),
        });
      }
      console.log(coordinacion);
      if (coordinacion.length != 0) {
        coordinacion.array.forEach((element) => {
          cursos.push(element.idCurso);
        });
      }
      if (cursos.length == 0) {
        return [];
      } else {
        cursos.array.forEach((element) => {
          curso.findOne({ consecutivo: element }, (err, cursobuscado) => {
            if (err) {
              return res.status(640).send({
                estado: "error",
                message: "error",
                data: Object.assign(err),
              });
            }
            competencias.array.forEach((compe) => {
              if (cursobuscado === compe) {
                encontrado = true;
              }
            });

            if (!encontrado) {
              competencias.push({
                nombre_competencia: cursobuscado.competencia,
              });
            } else {
              encontrado = false;
            }
          });
        });
        return competencias;
      }
    });
  });
}

function traerPreguntas(seccional) {
  var cursos = [];
  var encontrado = false;
  subgrupo.findOne({ seccional: seccional }, (err, subgrupos) => {
    if (err) {
      return res.status(640).send({
        estado: "error",
        message: "error",
        data: Object.assign(err),
      });
    }
    subgrupos.cursos.array.forEach((element) => {
      cursos.array.forEach((cur) => {
        if (element.idCurso === cur.idCurso) {
          encontrado = true;
        }
      });

      if (!encontrado) {
        cursos.push({ id_pregunta: element.idCurso });
      } else {
        encontrado = false;
      }
    });
  });
  coordinacion.findOne({ seccional: seccional }, (err, coordinacion) => {
    if (err) {
      return res.status(640).send({
        estado: "error",
        message: "error",
        data: Object.assign(err),
      });
    }
    coordinacion.cursos.array.forEach((element) => {
      cursos.array.forEach((cur) => {
        if (element.idCurso === cur.idCurso) {
          encontrado = true;
        }
      });

      if (!encontrado) {
        cursos.push({ id_pregunta: element.idCurso });
      } else {
        encontrado = false;
      }
    });
  });
  return cursos;
}
