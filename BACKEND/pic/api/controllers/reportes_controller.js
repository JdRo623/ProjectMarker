"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
var tools = require("../utils/tools.js");
var auth = require("./auth_controller.js");
const cuestionarioHandler = require("../../models/Cuestionario.model");
const usuariosHandler = require("../../models/user_j.model");
const preguntashandler = require("../../models/preguntas_w.model");
const rutasAprenidisajeHandler = require("../../models/ruta_aprendizaje.model");
const cursoHandler = require("../../models/curso.model");
const preguntasiiihandler = require("../utils/preguntasSeccionIII");
var Excel = require("exceljs");
var base64 = require("file-base64");
var preguntas_seccionIII = require("../utils/preguntasSeccionIII.js");

module.exports = {
  estado_Cuestionario: estado_Cuestionario,
  preguntas_Usuarioi: preguntas_Usuarioi,
  preguntas_Usuarioii: preguntas_Usuarioii,
  preguntas_Usuarioiii: preguntas_Usuarioiii,
  estado_RutaAprendizaje: estado_RutaAprendizaje,
};

function estado_Cuestionario(req, res) {
  try {
    var reporteUsuarios = async (req, res) => {
      var listadoReporte = [];
      var documentname = "Número total de inscrito por curso";

      cuestionarioHandler.find((err, cuestionarios) => {
        var usuariosId = [];

        for (var element of cuestionarios) {
          usuariosId.push(element.email);
        }

        usuariosHandler
          .find({ email: { $in: usuariosId } }, (err, usuarios) => {
            for (var element of cuestionarios) {
              var registro = {};
              for (var usuario of usuarios) {
                if (usuario.email == element.email) {
                  var respondidas = 0;
                  var totales = 0;

                  totales += element.listado_preguntas.length;
                  totales += element.listado_preguntas_seccion_iii.length;
                  element.listado_preguntas.forEach((preguntas) => {
                    if (preguntas.estado_respuesta != "No respondida") {
                      respondidas++;
                    }
                  });
                  element.listado_preguntas_seccion_iii.forEach((preguntas) => {
                    if (preguntas.estado_preguntas != "Respondida") {
                      respondidas++;
                    }
                  });
                  var avanceActual = (respondidas * 100) / totales;
                  if (element.estado_cuestionario == "Terminado") {
                    avanceActual = 100;
                  }
                  registro = {
                    codigo_cuestionario: element._id,
                    identificacion: usuario.identificacion,
                    apellidos_funcionario: tools.decrypt(usuario.apellidos),
                    nombre_funcionario: tools.decrypt(usuario.nombres),
                    cargo: tools.decrypt(usuario.cargo),
                    nivel1: tools.decrypt(usuario.nivel1),
                    nivel2: tools.decrypt(usuario.nivel2),
                    nivel3: tools.decrypt(usuario.nivel3),
                    correo: usuario.email,
                    personas_acargo: element.personasACargo,
                    directivo: element.personasACargo,
                    fecha_inicio: tools.decrypt(usuario.Fecha_Inicio),
                    fecha_terminacion: element.fecha_Finalizacion,
                    avance: avanceActual,
                    estado: element.estado_cuestionario,
                  };
                  listadoReporte.push(registro);
                }
              }
            }

            const workbookOut = new Excel.Workbook();
            const worksheetOut = workbookOut.addWorksheet(
              "reporte usuario cuestionario"
            );
            worksheetOut.columns = [
              { header: "Código_Cuestionario", key: "Código_Cuestionario" },
              { header: "Identificación", key: "Identificación" },
              {
                header: "Apellidos_del_Funcionario",
                key: "Apellidos_del_Funcionario",
              },
              {
                header: "Nombres_del_Funcionario",
                key: "Nombres_del_Funcionario",
              },
              { header: "Cargo", key: "Cargo" },
              { header: "Nivel_1_del_cargo", key: "Nivel_1_del_cargo" },
              { header: "Nivel_2_del_cargo", key: "Nivel_2_del_cargo" },
              { header: "Nivel_3_del_cargo", key: "Nivel_3_del_cargo" },
              { header: "Correo_Electrónico", key: "Correo_Electrónico" },
              {
                header: "Tiene_personas_a_cargo",
                key: "Tiene_personas_a_cargo",
              },
              { header: "Es_directivo", key: "Es_directivo" },
              { header: "Fecha de Inicio", key: "Fecha_de_Inicio" },
              { header: "Fecha_de_Terminación", key: "Fecha_de_Terminación" },
              { header: "Avance", key: "Avance" },
              { header: "Estado", key: "Estado" },
            ];
            listadoReporte.forEach((registro) => {
              worksheetOut.addRow({
                Código_Cuestionario: registro.codigo_cuestionario,
                Identificación: registro.identificacion,
                Apellidos_del_Funcionario: registro.apellidos_funcionario,
                Nombres_del_Funcionario: registro.nombre_funcionario,
                Cargo: registro.cargo,
                Nivel_1_del_cargo: registro.nivel1,
                Nivel_2_del_cargo: registro.nivel2,
                Nivel_3_del_cargo: registro.nivel3,
                Correo_Electrónico: registro.correo,
                Tiene_personas_a_cargo: registro.personas_acargo,
                Es_directivo: registro.directivo,
                Fecha_de_Inicio: registro.fecha_inicio,
                Fecha_de_Terminación: registro.fecha_terminacion,
                Avance: registro.avance,
                Estado: registro.estado,
              });
            });
            workbookOut.xlsx.writeFile(documentname).then(() => {
              base64.encode(documentname, function (err, base64String) {
                let respuesta = {
                  documento: base64String,
                  nombreArchivo: "Reporte Cuestionario.xlsx",
                };
                return res.status(200).send({
                  estado: "Descargado",
                  message: util.format(
                    "Archivo de usuarios generado exitosamente"
                  ),
                  data: Object.assign(respuesta),
                });
              });
            });
          })
      });
    };
    reporteUsuarios(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function preguntas_Usuarioi(req, res) {
  try {
    var preguntas_seccion1 = async (req, res) => {
      let listado = [];
      let filename = "Respuestas del cuestionario Sección I";
      cuestionarioHandler.find((err, cuestionarios) => {
        let usuariosId = [];
        for (let element of cuestionarios) {
          usuariosId.push(element.email);
        }

        usuariosHandler.find(
          { email: { $in: usuariosId } },
          (err, usuarios) => {
            var registro = {};
            for (let element of cuestionarios) {
              for (let usuario of usuarios) {
                if (usuario) {
                  if (usuario.email == element.email) {
                    element.listado_competencias.forEach((pregunta) => {
                      registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.identificacion,
                        apellidos_funcionario: tools.decrypt(usuario.nombres),
                        nombre_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: usuario.email,
                        seccion: "Seccion I",
                        codigo_competencia: pregunta.nombreCompetencia,
                        enunciado_respuesta: pregunta.valor_respuesta,
                        estado: pregunta.estado_respuesta,
                      };
                      listado.push(registro);
                    });
                  }
                }
              }
            }
            const workbookOut = new Excel.Workbook();
            const worksheetOut = workbookOut.addWorksheet(
              "reporte usuario cuestionario"
            );
            worksheetOut.columns = [
              { header: "Código_Cuestionario", key: "Código_Cuestionario" },
              { header: "Identificación", key: "Identificación" },
              {
                header: "Apellidos_del_Funcionario",
                key: "Apellidos_del_Funcionario",
              },
              {
                header: "Nombres_del_Funcionario",
                key: "Nombres_del_Funcionario",
              },
              { header: "Cargo", key: "Cargo" },
              { header: "Nivel_1_del_cargo", key: "Nivel_1_del_cargo" },
              { header: "Nivel_2_del_cargo", key: "Nivel_2_del_cargo" },
              { header: "Nivel_3_del_cargo", key: "Nivel_3_del_cargo" },
              { header: "Correo_Electrónico", key: "Correo_Electrónico" },
              { header: "seccion", key: "seccion" },
              { header: "Codigo", key: "Codigo" },
              { header: "respuesta_funcionario", key: "enunciado_respuesta" },
              { header: "estado", key: "estado" },
            ];
            listado.forEach((registro) => {
              worksheetOut.addRow({
                Código_Cuestionario: registro.codigo_cuestionario,
                Identificación: registro.identificacion,
                Apellidos_del_Funcionario: registro.apellidos_funcionario,
                Nombres_del_Funcionario: registro.nombre_funcionario,
                Cargo: registro.cargo,
                Nivel_1_del_cargo: registro.nivel1,
                Nivel_2_del_cargo: registro.nivel2,
                Nivel_3_del_cargo: registro.nivel3,
                Correo_Electrónico: registro.correo,
                seccion: registro.seccion,
                Codigo: registro.codigo_competencia,
                enunciado_respuesta: registro.enunciado_respuesta,
                Estado: registro.estado,
              });
            });
            workbookOut.xlsx.writeFile(filename).then(() => {
              base64.encode(filename, function (err, base64String) {
                let respuesta = {
                  documento: base64String,
                  nombreArchivo: filename + ".xlsx",
                };
                return res.status(200).send({
                  estado: "Descargado",
                  message: util.format(
                    "Archivo de preguntas generado exitosamente"
                  ),
                  data: Object.assign(respuesta),
                });
              });
            });
          }
        );
      });
    };
    preguntas_seccion1(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function preguntas_Usuarioii(req, res) {
  try {
    var preguntas_seccion1 = async (req, res) => {
      let listado = [];
      let filename = "Respuestas del cuestionario Sección II";
      cuestionarioHandler.find((err, cuestionarios) => {
        let usuariosId = [];
        for (let element of cuestionarios) {
          usuariosId.push(element.email);
        }
        usuariosHandler.find(
          { email: { $in: usuariosId } },
          (err, usuarios) => {
            preguntashandler.find((err, preguntaBus) => {
              var registro = {};
              for (let element of cuestionarios) {
                for (let usuario of usuarios) {
                  if (usuario.email == element.email) {
                    for (var preguntaCuestionario of element.listado_preguntas) {
                      for (var pregunta of preguntaBus) {
                        if (
                          pregunta.numero_pregunta ==
                          preguntaCuestionario.id_pregunta
                        ) {
                          registro = {
                            codigo_cuestionario: element._id,
                            identificacion: usuario.identificacion,
                            apellidos_funcionario: tools.decrypt(
                              usuario.nombres
                            ),
                            nombre_funcionario: tools.decrypt(
                              usuario.apellidos
                            ),
                            cargo: tools.decrypt(usuario.cargo),
                            nivel1: tools.decrypt(usuario.nivel1),
                            nivel2: tools.decrypt(usuario.nivel2),
                            nivel3: tools.decrypt(usuario.nivel3),
                            correo: usuario.email,
                            seccion: "Seccion II",
                            codigo: pregunta.numero_pregunta,
                            codigo_curso: pregunta.codificacion,
                            nombre_curso: pregunta.curso,
                            opcion_respuesta: pregunta.clave,
                            competencia: pregunta.competencia,
                            nivel: pregunta.nivel,
                            respuesta: preguntaCuestionario.valor_respuesta,
                            estado: preguntaCuestionario.estado_respuesta,
                          };
                          listado.push(registro);
                        }
                      }
                    }
                  }
                }
              }

              const workbookOut = new Excel.Workbook();
              const worksheetOut = workbookOut.addWorksheet(
                "reporte usuario cuestionario"
              );
              worksheetOut.columns = [
                { header: "Código_Cuestionario", key: "Código_Cuestionario" },
                { header: "Identificación", key: "Identificación" },
                {
                  header: "Apellidos_del_Funcionario",
                  key: "Apellidos_del_Funcionario",
                },
                {
                  header: "Nombres_del_Funcionario",
                  key: "Nombres_del_Funcionario",
                },
                { header: "Cargo", key: "Cargo" },
                { header: "Nivel_1_del_cargo", key: "Nivel_1_del_cargo" },
                { header: "Nivel_2_del_cargo", key: "Nivel_2_del_cargo" },
                { header: "Nivel_3_del_cargo", key: "Nivel_3_del_cargo" },
                { header: "Correo_Electrónico", key: "Correo_Electrónico" },
                { header: "Sección", key: "seccion" },
                { header: "Nombre de la Competencia", key: "competencia" },
                { header: "Nivel de la competencia", key: "nivel" },
                { header: "Código del Curso", key: "codigo_curso" },
                { header: "Nombre del Curso", key: "nombre_curso" },
                { header: "Código de la Pregunta", key: "codigo" },
                { header: "Opción Respuesta", key: "opcion_respuesta" },
                { header: "Enunciado Respuesta", key: "respuesta" },
                { header: "Estado", key: "estado" },
              ];
              listado.forEach((registro) => {
                worksheetOut.addRow({
                  Código_Cuestionario: registro.codigo_cuestionario,
                  Identificación: registro.identificacion,
                  Apellidos_del_Funcionario: registro.apellidos_funcionario,
                  Nombres_del_Funcionario: registro.nombre_funcionario,
                  Cargo: registro.cargo,
                  Nivel_1_del_cargo: registro.nivel1,
                  Nivel_2_del_cargo: registro.nivel2,
                  Nivel_3_del_cargo: registro.nivel3,
                  Correo_Electrónico: registro.correo,
                  seccion: registro.seccion,
                  codigo_curso: registro.codigo_curso,
                  nombre_curso: registro.nombre_curso,
                  codigo: registro.codigo,
                  competencia: registro.competencia,
                  nivel: registro.nivel,
                  opcion_respuesta: registro.opcion_respuesta,
                  respuesta: registro.respuesta,
                  estado: registro.estado,
                });
              });
              workbookOut.xlsx.writeFile(filename).then(() => {
                base64.encode(filename, function (err, base64String) {
                  let respuesta = {
                    documento: base64String,
                    nombreArchivo: filename + ".xlsx",
                  };
                  return res.status(200).send({
                    estado: "Descargado",
                    message: util.format(
                      "Archivo de preguntas generado exitosamente"
                    ),
                    data: Object.assign(respuesta),
                  });
                });
              });
            });
          }
        );
      });
    };
    preguntas_seccion1(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function preguntas_Usuarioiii(req, res) {
  try {
    var preguntas_seccion1 = async (req, res) => {
      let listado = [];
      let filename = "Respuestas del cuestionario Sección III";
      cuestionarioHandler.find((err, cuestionarios) => {
        let usuariosId = [];
        for (let element of cuestionarios) {
          usuariosId.push(element.email);
        }
        usuariosHandler.find(
          { email: { $in: usuariosId } },
          (err, usuarios) => {
            var registro = {};
            for (let element of cuestionarios) {
              for (let usuario of usuarios) {
                if (usuario) {
                  if (usuario.email == element.email) {
                    for (let pregunta of preguntas_seccionIII.preguntasMock) {
                      for (var preguntaCuestionario of element.listado_preguntas_seccion_iii) {
                        if (
                          pregunta.idPregunta ==
                          preguntaCuestionario.id_pregunta
                        ) {
                          registro = {
                            codigo_cuestionario: element._id,
                            identificacion: usuario.identificacion,
                            apellidos_funcionario: tools.decrypt(
                              usuario.nombres
                            ),
                            nombre_funcionario: tools.decrypt(
                              usuario.apellidos
                            ),
                            cargo: tools.decrypt(usuario.cargo),
                            nivel1: tools.decrypt(usuario.nivel1),
                            nivel2: tools.decrypt(usuario.nivel2),
                            nivel3: tools.decrypt(usuario.nivel3),
                            correo: usuario.email,
                            seccion: "Seccion III",
                            codigo: pregunta.idPregunta,
                            situacion: pregunta.situacionProblema,
                            enunciado: pregunta.encabezadoPregunta,
                            respuesta: preguntaCuestionario.valor_respuesta,
                            estado: preguntaCuestionario.estado_preguntas,
                          };
                          listado.push(registro);
                        }
                      }
                    }
                  }
                }
              }
            }

            const workbookOut = new Excel.Workbook();
            const worksheetOut = workbookOut.addWorksheet(
              "reporte usuario cuestionario"
            );
            worksheetOut.columns = [
              { header: "Código_Cuestionario", key: "Código_Cuestionario" },
              { header: "Identificación", key: "Identificación" },
              {
                header: "Apellidos_del_Funcionario",
                key: "Apellidos_del_Funcionario",
              },
              {
                header: "Nombres_del_Funcionario",
                key: "Nombres_del_Funcionario",
              },
              { header: "Cargo", key: "Cargo" },
              { header: "Nivel_1_del_cargo", key: "Nivel_1_del_cargo" },
              { header: "Nivel_2_del_cargo", key: "Nivel_2_del_cargo" },
              { header: "Nivel_3_del_cargo", key: "Nivel_3_del_cargo" },
              { header: "Correo_Electrónico", key: "Correo_Electrónico" },
              { header: "Sección", key: "seccion" },
              { header: "Código de la Pregunta", key: "codigo" },
              { header: "Situación", key: "situacion" },
              { header: "Enunciado", key: "enunciado" },
              { header: "Respuesta", key: "respuesta" },
              { header: "Estado", key: "estado" },
            ];
            listado.forEach((registro) => {
              worksheetOut.addRow({
                Código_Cuestionario: registro.codigo_cuestionario,
                Identificación: registro.identificacion,
                Apellidos_del_Funcionario: registro.apellidos_funcionario,
                Nombres_del_Funcionario: registro.nombre_funcionario,
                Cargo: registro.cargo,
                Nivel_1_del_cargo: registro.nivel1,
                Nivel_2_del_cargo: registro.nivel2,
                Nivel_3_del_cargo: registro.nivel3,
                Correo_Electrónico: registro.correo,
                seccion: registro.seccion,
                codigo: registro.codigo,
                situacion: registro.situacion,
                enunciado: registro.enunciado,
                respuesta: registro.respuesta,
                estado: registro.estado,
              });
            });
            workbookOut.xlsx.writeFile(filename).then(() => {
              base64.encode(filename, function (err, base64String) {
                let respuesta = {
                  documento: base64String,
                  nombreArchivo: filename + ".xlsx",
                };
                return res.status(200).send({
                  estado: "Descargado",
                  message: util.format(
                    "Archivo de preguntas generado exitosamente"
                  ),
                  data: Object.assign(respuesta),
                });
              });
            });
          }
        );
      });
    };
    preguntas_seccion1(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function estado_RutaAprendizaje(req, res) {
  try {
    var reporteUsuarios = async (req, res) => {
      let listadoReporte = [];
      let documentname = "reportes usuario ruta aprendizaje";
      rutasAprenidisajeHandler.find((err, rutas) => {
        let usuariosId = [];
        for (let element of rutas) {
          usuariosId.push(element.email);
        }
        usuariosHandler.find(
          { email: { $in: usuariosId } },
          (err, usuarios) => {
            for (let element of rutas) {
              for (let usuario of usuarios) {
                if (usuario) {
                  for (let competencias of element.listado_competencias) {
                    for (let basicos of competencias.listado_cursos_basicos) {
                      let registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.identificacion,
                        nombre_curso: basicos.nombreCurso,
                        nombre_ruta: competencias.nombreCompetencia,
                        nivel_competencia: "basico",
                        nombre_funcionario: tools.decrypt(usuario.nombres),
                        apellido_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: usuario.email,
                        estado: basicos.estado,
                      };
                      listadoReporte.push(registro);
                    }
                    for (let medios of competencias.listado_cursos_medios) {
                      let registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.identificacion,
                        nombre_curso: medios.nombreCurso,
                        nombre_ruta: competencias.nombreCompetencia,
                        nivel_competencia: "medio",
                        nombre_funcionario: tools.decrypt(usuario.nombres),
                        apellido_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: usuario.email,
                        estado: medios.estado,
                      };
                      listadoReporte.push(registro);
                    }
                    for (let altos of competencias.listado_cursos_altos) {
                      let registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.identificacion,
                        nombre_curso: altos.nombreCurso,
                        nombre_ruta: competencias.nombreCompetencia,
                        nivel_competencia: "alto",
                        nombre_funcionario: tools.decrypt(usuario.nombres),
                        apellido_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: usuario.email,
                        estado: altos.estado,
                      };
                      listadoReporte.push(registro);
                    }
                    for (let superiores of competencias.listado_cursos_superiores) {
                      let registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.identificacion,
                        nombre_curso: superiores.nombreCurso,
                        nombre_ruta: competencias.nombreCompetencia,
                        nivel_competencia: "superior",
                        nombre_funcionario: tools.decrypt(usuario.nombres),
                        apellido_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: usuario.email,
                        estado: superiores.estado,
                      };
                      listadoReporte.push(registro);
                    }
                  }
                }
              }

              const workbookOut = new Excel.Workbook();
              const worksheetOut = workbookOut.addWorksheet(
                "reporte usuario cuestionario"
              );
              worksheetOut.columns = [
                { header: "codigo_ruta", key: "codigo_ruta" },
                {
                  header: "Identificacion",
                  key: "identificacion",
                },
                {
                  header: "Apellidos_del_Funcionario",
                  key: "Apellidos_del_Funcionario",
                },
                {
                  header: "Nombres_del_Funcionario",
                  key: "Nombres_del_Funcionario",
                },
                { header: "Cargo", key: "Cargo" },
                { header: "Nivel_1_del_cargo", key: "Nivel_1_del_cargo" },
                { header: "Nivel_2_del_cargo", key: "Nivel_2_del_cargo" },
                { header: "Nivel_3_del_cargo", key: "Nivel_3_del_cargo" },
                { header: "Correo_Electrónico", key: "Correo_Electrónico" },
                { header: "nombre_curso", key: "nombre_curso" },
                { header: "nombre_ruta", key: "nombre_ruta" },
                { header: "nivel_competencia", key: "nivel_competencia" },
                { header: "Estado", key: "Estado" },
              ];
              listadoReporte.forEach((registro) => {
                worksheetOut.addRow({
                  codigo_ruta: registro.codigo_cuestionario,
                  nombre_curso: registro.nombre_curso,
                  nombre_ruta: registro.nombre_ruta,
                  nivel_competencia: registro.nivel_competencia,
                  Nombres_del_Funcionario: registro.nombre_funcionario,
                  Apellidos_del_Funcionario: registro.apellido_funcionario,
                  Cargo: registro.cargo,
                  Nivel_1_del_cargo: registro.nivel1,
                  Nivel_2_del_cargo: registro.nivel2,
                  Nivel_3_del_cargo: registro.nivel3,
                  Correo_Electrónico: registro.correo,
                  Estado: registro.estado,
                  identificacion: registro.identificacion,
                });
              });
              workbookOut.xlsx.writeFile(documentname).then(() => {
                base64.encode(documentname, function (err, base64String) {
                  let respuesta = {
                    documento: base64String,
                    nombreArchivo: "Reporte Ruta.xlsx",
                  };
                  return res.status(200).send({
                    estado: "Descargado",
                    message: util.format(
                      "Archivo de ruta de aprendizaje generado exitosamente"
                    ),
                    data: Object.assign(respuesta),
                  });
                });
              });
            }
          }
        );
      });
    };
    reporteUsuarios(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}
