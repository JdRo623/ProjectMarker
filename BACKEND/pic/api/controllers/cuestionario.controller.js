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
const seccionalHandlres = require("../../models/seccionales.model");
const NivelHandler = require("../../models/nivel.model");

var auth = require("../controllers/auth_controller.js");
const { ftruncate } = require("fs");
const e = require("express");

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

//TODO:Modificar mensajes y varibles a dependencia
function listadoDependencia(req, res) {
  try {
    var dec = tools.decryptJson(req.body.data);
    var ListaDependencias = [];
    var listadoPorDependencia = async (req, res) => {
      let dependencias = await seccionalHandlres.find();
      let cuestionarios = await cuestionarioHandler.find({
        estado_cuestionario: dec.estado_cuestionario,
      });

      if (!cuestionarios) {
        return res.status(200).send({
          estado: "No hay cuestionarios homologados",
          message: "No hay cuestionarios homologados",
          data: Object.assign({}),
        });
      }

      let date = new Date();

      for (let cuestionario of cuestionarios) {
        let datosFaltantes = {
          fechaReporte:
            date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
          horaReporte:
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
          usuario: "",
        };
        let encontrado = await usuario.findOne({ email: cuestionario.email });

        let usuarioEncontrado = {};
        if (!encontrado) {
          usuarioEncontrado = "Usuario sin identificar";
        } else {
          usuarioEncontrado = {
            nombres: tools.decrypt(encontrado.nombres),
            apellidos: tools.decrypt(encontrado.apellidos),
            nombres_jefe: tools.decrypt(encontrado.nombres_jefe),
            apellidos_jefe: tools.decrypt(encontrado.apellidos_jefe),
            email: encontrado.email,
            identificacion: tools.decrypt(encontrado.identificacion),
            ciudad: tools.decrypt(encontrado.ciudad),
            cargo: tools.decrypt(encontrado.cargo),
            descripccion_cargo: tools.decrypt(encontrado.descripccion_cargo),
          };
        }
        datosFaltantes.usuario = usuarioEncontrado;
        ListaDependencias.push(datosFaltantes);
      }
      return res.status(200).send({
        estado: "lista de cuestionarios Dependencia",
        message: "lista de cuestionarios Dependencia",
        data: Object.assign(ListaDependencias),
      });
    };
    listadoPorDependencia(req, res);
  } catch (err) {
    return res.status(640).send({
      estado: "error",
      message: "error",
      data: Object.assign(err),
    });
  }
}

function actualizarPreguntaIII(req, res) {
  try {
    var actu = async (req, res) => {
      var dec = tools.decryptJson(req.body.data);
      var fecha = tools.getFechaActual()
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
          if(dec.data.id_pregunta == "3.16"){
            cuestionarioBuscado.estado_cuestionario = "Terminado"
            fecha_Finalizacion = fecha
          }
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

          var preguntasFinales = [];
          cuestionarioBuscado.listado_preguntas.forEach((pregunta) => {
            if (pregunta.competencia != dec.data.competencia) {
              preguntasFinales.push(pregunta);
            }
          });
          cuestionarioBuscado.listado_preguntas = preguntasFinales;
          //Sí el valor respuesta == 0 entonces llamar las preguntas con query que tengan en su campo de competencia, y crear una lista de preguntas sección ii nuevas sin esa competenicia
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
    var listadoHomologados = async (req, res) => {
      let cuestionarios = await cuestionarioHandler.find({
        estado_cuestionario: dec.estado_cuestionario,
      });

      if (!cuestionarios) {
        return res.status(200).send({
          estado: "No hay cuestionarios homologados",
          message: "No hay cuestionarios homologados",
          data: Object.assign({}),
        });
      }

      let date = new Date();

      for (let cuestionario of cuestionarios) {
        let datosFaltantes = {
          fechaReporte:
            date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
          horaReporte:
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
          usuario: "",
        };
        let encontrado = await usuario.findOne({ email: cuestionario.email });

        let usuarioEncontrado = {};
        if (!encontrado) {
          usuarioEncontrado = "Usuario sin identificar";
        } else {
          usuarioEncontrado = {
            nombres: tools.decrypt(encontrado.nombres),
            apellidos: tools.decrypt(encontrado.apellidos),
            nombres_jefe: tools.decrypt(encontrado.nombres_jefe),
            apellidos_jefe: tools.decrypt(encontrado.apellidos_jefe),
            email: encontrado.email,
            identificacion: tools.decrypt(encontrado.identificacion),
            ciudad: tools.decrypt(encontrado.ciudad),
            cargo: tools.decrypt(encontrado.cargo),
            descripccion_cargo: tools.decrypt(encontrado.descripccion_cargo),
          };
        }
        datosFaltantes.usuario = usuarioEncontrado;
        homologados.push(datosFaltantes);
      }
      return res.status(200).send({
        estado: "lista de cuestionarios homologados",
        message: "lista de cuestionarios homologados",
        data: Object.assign(homologados),
      });
    };
    listadoHomologados(req, res);
  } catch (err) {
    return res.status(640).send({
      estado: "error",
      message: "error",
      data: Object.assign(err),
    });
  }
}

function cuestionarioSinCompletar(req, res) {
  try {
    var dec = tools.decryptJson(req.body.data);
    var incompletos = [];
    var listadoIncompletos = async (req, res) => {
      let cuestionarios = await cuestionarioHandler.find({
        estado_cuestionario: dec.estado_cuestionario,
      });

      if (!cuestionarios) {
        return res.status(200).send({
          estado: "No hay cuestionarios incompletos",
          message: "No hay cuestionarios incompletos",
          data: Object.assign({}),
        });
      }

      let date = new Date();

      for (let cuestionario of cuestionarios) {
        let datosFaltantes = {
          fechaReporte:
            date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
          horaReporte:
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
          usuario: "",
        };
        let encontrado = await usuario.findOne({ email: cuestionario.email });

        let usuarioEncontrado = {};
        if (!encontrado) {
          usuarioEncontrado = "Usuario sin identificar";
        } else {
          usuarioEncontrado = {
            nombres: tools.decrypt(encontrado.nombres),
            apellidos: tools.decrypt(encontrado.apellidos),
            nombres_jefe: tools.decrypt(encontrado.nombres_jefe),
            apellidos_jefe: tools.decrypt(encontrado.apellidos_jefe),
            email: encontrado.email,
            identificacion: tools.decrypt(encontrado.identificacion),
            ciudad: tools.decrypt(encontrado.ciudad),
            cargo: tools.decrypt(encontrado.cargo),
            descripccion_cargo: tools.decrypt(encontrado.descripccion_cargo),
          };
        }
        datosFaltantes.usuario = usuarioEncontrado;
        incompletos.push(datosFaltantes);
      }
      return res.status(200).send({
        estado: "lista de cuestionarios incompletos",
        message: "lista de cuestionarios incompletos",
        data: Object.assign(incompletos),
      });
    };
    listadoIncompletos(req, res);
  } catch (err) {
    return res.status(640).send({
      estado: "error",
      message: "error",
      data: Object.assign(err),
    });
  }
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
      var cursosGeneral = [];
      var cursosEspecificos = [];

      var cursos = [];

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

            NivelHandler.findOne(
              {
                nombre: cues.coordinacion,
                predecesor: cues.subgrupo,
                tipo_nivel: "NIVEL_4",
              },
              (err, coordinacionEncontrada) => {
                if (err) {
                  return res.status(640).send({
                    estado: "error",
                    message: "error",
                    data: Object.assign(err),
                  });
                }
                if (!coordinacionEncontrada) {
                  return res.status(640).send({
                    estado: "Error",
                    message: "Coordinación no encontrada",
                    data: Object.assign({}),
                  });
                }
                NivelHandler.findOne(
                  {
                    nombre: cues.subgrupo,
                    predecesor: cues.seccional,
                    tipo_nivel: "NIVEL_3",
                  },
                  (err, subgrupoEncontrado) => {
                    if (err) {
                      return res.status(640).send({
                        estado: "error",
                        message: "error",
                        data: Object.assign(err),
                      });
                    }
                    if (!subgrupoEncontrado) {
                      return res.status(640).send({
                        estado: "Error",
                        message: "SubGrupo no encontrado",
                        data: Object.assign({}),
                      });
                    }
                    NivelHandler.findOne(
                      {
                        nombre: cues.seccional,
                        tipo_nivel: "NIVEL_2",
                      },
                      (err, seccionalesEncontradas) => {
                        if (err) {
                          return res.status(640).send({
                            estado: "error",
                            message: "error",
                            data: Object.assign(err),
                          });
                        }
                        if (!seccionalesEncontradas) {
                          return res.status(640).send({
                            estado: "Error",
                            message: "Seccional no encontrada",
                            data: Object.assign({}),
                          });
                        }

                        if (
                          coordinacionEncontrada.cargos.length != 0 &&
                          coordinacionEncontrada.nombre != "N/A"
                        ) {
                          coordinacionEncontrada.cargos.forEach((cargo) => {
                            if (cargo.nombreCargo == "GENERAL") {
                              cursosGeneral = cargo.cursos;
                            }
                            if (cargo.nombreCargo == cues.rol) {
                              cursosEspecificos = cargo.cursos;
                            }
                          });
                        } else if (
                          subgrupoEncontrado.cargos.length != 0 &&
                          subgrupoEncontrado.nombre != "N/A"
                        ) {
                          subgrupoEncontrado.cargos.forEach((cargo) => {
                            if (cargo.nombreCargo == "GENERAL") {
                              cursosGeneral = cargo.cursos;
                            }
                            if (cargo.nombreCargo == cues.rol) {
                              cursosEspecificos = cargo.cursos;
                            }
                          });
                        } else if (seccionalesEncontradas.cargos.length != 0) {
                          seccionalesEncontradas.cargos.forEach((cargo) => {
                            if (cargo.nombreCargo == "GENERAL") {
                              cursosGeneral = cargo.cursos;
                            }
                            if (cargo.nombreCargo == cues.rol) {
                              cursosEspecificos = cargo.cursos;
                            }
                          });
                        }

                        if (cursosEspecificos.length == 0) {
                          cursos = cursosGeneral;
                        } else {
                          cursos = cursosEspecificos;
                        }
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
                              listadoCursosObtenidos.forEach(
                                (cursoObtenido) => {
                                  if (
                                    cursoObtenido.consecutivo ==
                                    cursoEspecifico.idCurso
                                  ) {
                                    if (
                                      !competencias.includes(
                                        cursoObtenido.competencia.trim()
                                      )
                                    ) {
                                      competencias.push(
                                        cursoObtenido.competencia.trim()
                                      );
                                      competenciasGuardar.push({
                                        nombreCompetencia: cursoObtenido.competencia.trim(),
                                        descripcionCompetencia:
                                          cursoObtenido.descripcion_competencia,
                                      });
                                    }
                                  }
                                }
                              );
                            }
                          );
                          newCuestionario.listado_competencias = competenciasGuardar;
                          preguntas_seccionIII.preguntasMock.forEach(
                            (preguntaSeccionIII) => {
                              newCuestionario.listado_preguntas_seccion_iii.push(
                                {
                                  id_pregunta: preguntaSeccionIII.idPregunta,
                                }
                              );
                            }
                          );
                          //  newCuestionario.listado_competencias = competencias
                          PreguntasHandler.find(
                            { codificacion: { $in: cursos } },
                            (err, listadoPreguntas) => {
                              listadoPreguntas.forEach((preguntaEspecifica) => {
                                newCuestionario.listado_preguntas.push({
                                  id_pregunta:
                                    preguntaEspecifica.numero_pregunta,
                                });
                              });
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
                                        return res.status(200).send({
                                          estado: "Exito",
                                          message: util.format(
                                            "Cuestionario registrado exitosamente"
                                          ),
                                          data: Object.assign(
                                            cuestionarioCreado
                                          ),
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
      var cursosGeneral = [];
      var cursosEspecificos = [];
      var cursos = [];
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

      NivelHandler.findOne(
        {
          nombre: cues.coordinacion,
          predecesor: cues.subgrupo,
          tipo_nivel: "NIVEL_4",
        },
        (err, coordinacionEncontrada) => {
          if (err) {
            return res.status(640).send({
              estado: "error",
              message: "error",
              data: Object.assign(err),
            });
          }
          if (!coordinacionEncontrada) {
            return res.status(640).send({
              estado: "Error",
              message: "Coordinación no encontrada",
              data: Object.assign({}),
            });
          }
          NivelHandler.findOne(
            {
              nombre: cues.subgrupo,
              predecesor: cues.seccional,
              tipo_nivel: "NIVEL_3",
            },
            (err, subgrupoEncontrado) => {
              if (err) {
                return res.status(640).send({
                  estado: "error",
                  message: "error",
                  data: Object.assign(err),
                });
              }
              if (!subgrupoEncontrado) {
                return res.status(640).send({
                  estado: "Error",
                  message: "SubGrupo no encontrado",
                  data: Object.assign({}),
                });
              }
              NivelHandler.findOne(
                {
                  nombre: cues.seccional,
                  tipo_nivel: "NIVEL_2",
                },
                (err, seccionalesEncontradas) => {
                  if (err) {
                    return res.status(640).send({
                      estado: "error",
                      message: "error",
                      data: Object.assign(err),
                    });
                  }

                  if (!seccionalesEncontradas) {
                    return res.status(640).send({
                      estado: "Error",
                      message: "Seccional no encontrada",
                      data: Object.assign({}),
                    });
                  }

                  if (
                    coordinacionEncontrada.cargos.length != 0 &&
                    coordinacionEncontrada.nombre != "N/A"
                  ) {
                    coordinacionEncontrada.cargos.forEach((cargo) => {
                      if (cargo.nombreCargo == "GENERAL") {
                        cursosGeneral = cargo.cursos;
                      }
                      if (cargo.nombreCargo == cues.rol) {
                        cursosEspecificos = cargo.cursos;
                      }
                    });
                  } else if (
                    subgrupoEncontrado.cargos.length != 0 &&
                    subgrupoEncontrado.nombre != "N/A"
                  ) {
                    subgrupoEncontrado.cargos.forEach((cargo) => {
                      if (cargo.nombreCargo == "GENERAL") {
                        cursosGeneral = cargo.cursos;
                      }
                      if (cargo.nombreCargo == cues.rol) {
                        cursosEspecificos = cargo.cursos;
                      }
                    });
                  } else if (seccionalesEncontradas.cargos.length != 0) {
                    seccionalesEncontradas.cargos.forEach((cargo) => {
                      if (cargo.nombreCargo == "GENERAL") {
                        cursosGeneral = cargo.cursos;
                      }
                      if (cargo.nombreCargo == cues.rol) {
                        cursosEspecificos = cargo.cursos;
                      }
                    });
                  }

                  if (cursosEspecificos.length == 0) {
                    cursos = cursosGeneral;
                  } else {
                    cursos = cursosEspecificos;
                  }
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
                            cursoObtenido.consecutivo == cursoEspecifico.idCurso
                          ) {
                            if (
                              !competencias.includes(cursoObtenido.competencia)
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
                        var CuestionarioGuardar = new cuestionarioHandler(
                          newCuestionario
                        );
                        var temp = "";
                        newCuestionario.listado_competencias.sort(function (a, b) {
                          if (a.nombreCompetencia < b.nombreCompetencia) {
                            return -1;
                          }
                          if (a.nombreCompetencia > b.nombreCompetencia) {
                            return 1;
                          }
                          return 0;
                        });
                        newCuestionario.listado_competencias.forEach(
                              (cursoObtenido) => {
                                temp +=
                                  "" + cursoObtenido.nombreCompetencia + " - ";
                              }
                            );
                            newCuestionario.listado_competencias = temp;

                            temp = "";
                            newCuestionario.listado_cursos.sort(function (a, b) {
                              if (a.idCurso < b.idCurso) {
                                return -1;
                              }
                              if (a.idCurso > b.idCurso) {
                                return 1;
                              }
                              return 0;
                            });
                            newCuestionario.listado_cursos.forEach(
                              (cursoObtenido) => {
                                temp += "" + cursoObtenido.idCurso + " - ";
                              }
                            );
                            newCuestionario.listado_cursos = temp;

                            temp = "";
                            newCuestionario.listado_preguntas.sort(function (a, b) {
                              if (a.id_pregunta < b.id_pregunta) {
                                return -1;
                              }
                              if (a.id_pregunta > b.id_pregunta) {
                                return 1;
                              }
                              return 0;
                            });
                            newCuestionario.listado_preguntas.forEach(
                              (cursoObtenido) => {
                                temp += "" + cursoObtenido.id_pregunta + " - ";
                              }
                            );
                            newCuestionario.listado_preguntas = temp;

                            temp = "";
                            newCuestionario.listado_preguntas_seccion_iii.sort(function (a, b) {
                              if (a.id_pregunta < b.id_pregunta) {
                                return -1;
                              }
                              if (a.id_pregunta > b.id_pregunta) {
                                return 1;
                              }
                              return 0;
                            });
                            newCuestionario.listado_preguntas_seccion_iii.forEach(
                              (cursoObtenido) => {
                                temp += "" + cursoObtenido.id_pregunta + " - ";
                              }
                            );

                            newCuestionario.listado_preguntas_seccion_iii = temp;

                        return res.status(200).send({
                          estado: "Exito",
                          message: util.format(
                            "Cuestionario registrado Exitosamente"
                          ),
                          data: Object.assign(newCuestionario),
                        });
                      }
                    );
                  });
                }
              );
            }
          );
        }
      );
    };
    agregar(req, res);
  } catch (error) {
    throw boom.boomify(err);
  }
}

function traerCompetencias(seccional) {
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
