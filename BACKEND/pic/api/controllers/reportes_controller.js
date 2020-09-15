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
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

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

        usuariosHandler.find(
          { email: { $in: usuariosId } },
          (err, usuarios) => {
            for (var element of cuestionarios) {
              var registro = {};
              for (var usuario of usuarios) {
                if (usuario.email == element.email) {
                  var respondidas = 0;
                  var totales = 0;

                  totales += element.listado_competencias.length;
                  totales += element.listado_preguntas.length;
                  totales += element.listado_preguntas_seccion_iii.length;
                  element.listado_competencias.forEach((preguntas) => {
                    if (preguntas.estado_respuesta != "No respondida") {
                      respondidas++;
                    }
                  });
                  element.listado_preguntas.forEach((preguntas) => {
                    if (preguntas.estado_respuesta != "No respondida") {
                      respondidas++;
                    }
                  });
                  element.listado_preguntas_seccion_iii.forEach((preguntas) => {
                    if (preguntas.estado_preguntas != "No respondida") {
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
                    nivel1: tools.decrypt(usuario.nivel2),
                    nivel2: tools.decrypt(usuario.nivel3),
                    nivel3: tools.decrypt(usuario.nivel4),
                    nivel4: tools.decrypt(usuario.nivel1),
                    correo: usuario.email,
                    fecha_inicio: element.fecha_Inicio,
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
              { header: "Código Cuestionario", key: "Código_Cuestionario" },
              { header: "Identificación", key: "Identificación" },
              {
                header: "Apellidos del Funcionario",
                key: "Apellidos",
              },
              {
                header: "Nombres del Funcionario",
                key: "Nombres",
              },
              { header: "Cargo", key: "Cargo" },
              { header: "Nivel 1 del cargo", key: "Nivel_1_del_cargo" },
              { header: "Nivel 2 del cargo", key: "Nivel_2_del_cargo" },
              { header: "Nivel 3 del cargo", key: "Nivel_3_del_cargo" },
              { header: "Nivel 4 del cargo", key: "Nivel_4_del_cargo" },
              { header: "Correo Electrónico", key: "Correo_Electrónico" },
              { header: "Fecha de Inicio", key: "Fecha_de_Inicio" },
              { header: "Fecha de Terminación", key: "Fecha_de_Terminación" },
              { header: "Avance", key: "Avance" },
              { header: "Estado", key: "Estado" },
            ];
            listadoReporte.forEach((registro) => {
              worksheetOut.addRow({
                Código_Cuestionario: registro.codigo_cuestionario,
                Identificación: registro.identificacion,
                Apellidos: registro.apellidos_funcionario,
                Nombres: registro.nombre_funcionario,
                Cargo: registro.cargo,
                Nivel_1_del_cargo: registro.nivel4,
                Nivel_2_del_cargo: registro.nivel1,
                Nivel_3_del_cargo: registro.nivel2,
                Nivel_4_del_cargo: registro.nivel3,
                Correo_Electrónico: registro.correo,
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
                  nombreArchivo:
                    "Estado de la aplicación del Cuestionario.xlsx",
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
          }
        );
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
      var varTempEstado = "Pendiente";
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
                      varTempEstado = "Pendiente";
                      if (pregunta.estado_respuesta == "Respondida") {
                        varTempEstado = "Terminado";
                      }
                      registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.identificacion,
                        apellidos_funcionario: tools.decrypt(usuario.apellidos),
                        nombre_funcionario: tools.decrypt(usuario.nombres),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel2),
                        nivel2: tools.decrypt(usuario.nivel3),
                        nivel3: tools.decrypt(usuario.nivel4),
                        nivel4: tools.decrypt(usuario.nivel1),
                        correo: usuario.email,
                        seccion: "Seccion I",
                        codigo_competencia: pregunta.nombreCompetencia,
                        enunciado_respuesta: pregunta.valor_respuesta,
                        estado: varTempEstado,
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
              { header: "Código Cuestionario", key: "Código_Cuestionario" },
              { header: "Identificación", key: "Identificación" },
              {
                header: "Apellidos del Funcionario",
                key: "Apellidos_del_Funcionario",
              },
              {
                header: "Nombres del Funcionario",
                key: "Nombres_del_Funcionario",
              },
              { header: "Cargo", key: "Cargo" },
              { header: "Nivel 1 del cargo", key: "Nivel_1_del_cargo" },
              { header: "Nivel 2 del cargo", key: "Nivel_2_del_cargo" },
              { header: "Nivel 3 del cargo", key: "Nivel_3_del_cargo" },
              { header: "Nivel 4 del cargo", key: "Nivel_4_del_cargo" },
              { header: "Correo Electrónico", key: "Correo_Electrónico" },
              { header: "Sección", key: "seccion" },
              { header: "Nombre Competencia", key: "Codigo" },
              { header: "Opción Respuesta", key: "enunciado_respuesta" },
              { header: "Estado", key: "estado" },
            ];
            listado.forEach((registro) => {
              worksheetOut.addRow({
                Código_Cuestionario: registro.codigo_cuestionario,
                Identificación: registro.identificacion,
                Apellidos_del_Funcionario: registro.apellidos_funcionario,
                Nombres_del_Funcionario: registro.nombre_funcionario,
                Cargo: registro.cargo,
                Nivel_1_del_cargo: registro.nivel4,
                Nivel_2_del_cargo: registro.nivel1,
                Nivel_3_del_cargo: registro.nivel2,
                Nivel_4_del_cargo: registro.nivel3,
                Correo_Electrónico: registro.correo,
                seccion: registro.seccion,
                Codigo: registro.codigo_competencia,
                enunciado_respuesta: registro.enunciado_respuesta,
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

function preguntas_Usuarioii(req, res) {
  try {
    var preguntas_seccion1 = async (req, res) => {
      let listado = [];
      let filename = "Respuestas del cuestionario Sección II";
      var varTempEstado = "Pendiente";
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
                          varTempEstado = "Pendiente";
                          if (
                            preguntaCuestionario.estado_respuesta ==
                            "Respondida"
                          ) {
                            varTempEstado = "Terminado";
                          }
                          registro = {
                            codigo_cuestionario: element._id,
                            identificacion: usuario.identificacion,
                            apellidos_funcionario: tools.decrypt(
                              usuario.apellidos
                            ),
                            nombre_funcionario: tools.decrypt(usuario.nombres),
                            cargo: tools.decrypt(usuario.cargo),
                            nivel1: tools.decrypt(usuario.nivel2),
                            nivel2: tools.decrypt(usuario.nivel3),
                            nivel3: tools.decrypt(usuario.nivel4),
                            nivel4: tools.decrypt(usuario.nivel1),
                            correo: usuario.email,
                            seccion: "Seccion II",
                            codigo: pregunta.numero_pregunta,
                            codigo_curso: pregunta.codificacion,
                            nombre_curso: pregunta.curso,
                            opcion_respuesta: pregunta.clave,
                            competencia: pregunta.competencia,
                            nivel: pregunta.nivel,
                            respuesta: preguntaCuestionario.valor_respuesta,
                            estado: varTempEstado,
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
                { header: "Código Cuestionario", key: "Código_Cuestionario" },
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
                { header: "Nivel 4 del cargo", key: "Nivel_4_del_cargo" },
                { header: "Correo_Electrónico", key: "Correo_Electrónico" },
                { header: "Sección", key: "seccion" },
                { header: "Nombre de la Competencia", key: "competencia" },
                { header: "Nivel de la competencia", key: "nivel" },
                { header: "Código del Curso", key: "codigo_curso" },
                { header: "Nombre del Curso", key: "nombre_curso" },
                { header: "Código de la Pregunta", key: "codigo" },
                { header: "Opción Respuesta", key: "opcion_respuesta" },
                { header: "Respuesta Correcta", key: "respuesta" },
                { header: "Estado", key: "estado" },
              ];
              listado.forEach((registro) => {
                worksheetOut.addRow({
                  Código_Cuestionario: registro.codigo_cuestionario,
                  Identificación: registro.identificacion,
                  Apellidos_del_Funcionario: registro.apellidos_funcionario,
                  Nombres_del_Funcionario: registro.nombre_funcionario,
                  Cargo: registro.cargo,
                  Nivel_1_del_cargo: registro.nivel4,
                  Nivel_2_del_cargo: registro.nivel1,
                  Nivel_3_del_cargo: registro.nivel2,
                  Nivel_4_del_cargo: registro.nivel3,
                  Correo_Electrónico: registro.correo,
                  seccion: registro.seccion,
                  codigo_curso: registro.codigo_curso,
                  nombre_curso: registro.nombre_curso,
                  codigo: registro.codigo,
                  competencia: registro.competencia,
                  nivel: registro.nivel,
                  opcion_respuesta: registro.respuesta,
                  respuesta: registro.opcion_respuesta,
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
      var varTempEstado = "Pendiente";
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
                          varTempEstado = "Pendiente";
                          if (
                            preguntaCuestionario.estado_respuesta ==
                            "Respondida"
                          ) {
                            varTempEstado = "Terminado";
                          }
                          registro = {
                            codigo_cuestionario: element._id,
                            identificacion: usuario.identificacion,
                            apellidos_funcionario: tools.decrypt(
                              usuario.apellidos
                            ),
                            nombre_funcionario: tools.decrypt(usuario.nombres),
                            cargo: tools.decrypt(usuario.cargo),
                            nivel1: tools.decrypt(usuario.nivel2),
                            nivel2: tools.decrypt(usuario.nivel3),
                            nivel3: tools.decrypt(usuario.nivel4),
                            nivel4: tools.decrypt(usuario.nivel1),
                            correo: usuario.email,
                            seccion: "Seccion III",
                            codigo: pregunta.idPregunta,
                            situacion: pregunta.situacionProblema,
                            enunciado: pregunta.encabezadoPregunta,
                            respuesta: preguntaCuestionario.valor_respuesta,
                            estado: varTempEstado,
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
              { header: "Código Cuestionario", key: "Código_Cuestionario" },
              { header: "Identificación", key: "Identificación" },
              {
                header: "Apellidos del Funcionario",
                key: "Apellidos_del_Funcionario",
              },
              {
                header: "Nombres del Funcionario",
                key: "Nombres_del_Funcionario",
              },
              { header: "Cargo", key: "Cargo" },
              { header: "Nivel 1 del cargo", key: "Nivel_1_del_cargo" },
              { header: "Nivel 2 del cargo", key: "Nivel_2_del_cargo" },
              { header: "Nivel 3 del cargo", key: "Nivel_3_del_cargo" },
              { header: "Nivel 4 del cargo", key: "Nivel_4_del_cargo" },
              { header: "Correo Electrónico", key: "Correo_Electrónico" },
              { header: "Sección", key: "seccion" },
              { header: "Código de la Pregunta", key: "codigo" },
              { header: "Situación", key: "situacion" },
              { header: "Enunciado", key: "enunciado" },
              { header: "Opción Respuesta", key: "respuesta" },
              { header: "Estado", key: "estado" },
            ];
            listado.forEach((registro) => {
              worksheetOut.addRow({
                Código_Cuestionario: registro.codigo_cuestionario,
                Identificación: registro.identificacion,
                Apellidos_del_Funcionario: registro.apellidos_funcionario,
                Nombres_del_Funcionario: registro.nombre_funcionario,
                Cargo: registro.cargo,
                Nivel_1_del_cargo: registro.nivel4,
                Nivel_2_del_cargo: registro.nivel1,
                Nivel_3_del_cargo: registro.nivel2,
                Nivel_4_del_cargo: registro.nivel3,
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
      let listadoReporteCompetencia = [];

      var aprobado = false;
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
                  if (usuario.email == element.email) {
                    for (let competencias of element.listado_competencias) {
                      aprobado = true;
                      listadoReporteCompetencia = [];
                      for (let basicos of competencias.listado_cursos_basicos) {
                        let registro = {
                          codigo_cuestionario: basicos.idCurso,
                          identificacion: usuario.identificacion,
                          nombre_curso: basicos.nombreCurso,
                          proceso: basicos.proceso,
                          certificado: "NO",
                          nombre_ruta: competencias.nombreCompetencia,
                          nivel_competencia: "basico",
                          nombre_funcionario: tools.decrypt(usuario.nombres),
                          apellido_funcionario: tools.decrypt(
                            usuario.apellidos
                          ),
                          cargo: tools.decrypt(usuario.cargo),
                          nivel1: tools.decrypt(usuario.nivel2),
                          nivel2: tools.decrypt(usuario.nivel3),
                          nivel3: tools.decrypt(usuario.nivel4),
                          nivel4: tools.decrypt(usuario.nivel1),
                          correo: usuario.email,
                          estado: basicos.estado,
                        };
                        listadoReporteCompetencia.push(registro);
                        if (basicos.estado != "Aprobado") {
                          aprobado = false;
                        }
                      }
                      for (let medios of competencias.listado_cursos_medios) {
                        let registro = {
                          codigo_cuestionario: medios.idCurso,
                          identificacion: usuario.identificacion,
                          nombre_curso: medios.nombreCurso,
                          proceso: medios.proceso,
                          certificado: "NO",
                          nombre_ruta: competencias.nombreCompetencia,
                          nivel_competencia: "medio",
                          nombre_funcionario: tools.decrypt(usuario.nombres),
                          apellido_funcionario: tools.decrypt(
                            usuario.apellidos
                          ),
                          cargo: tools.decrypt(usuario.cargo),
                          nivel1: tools.decrypt(usuario.nivel2),
                          nivel2: tools.decrypt(usuario.nivel3),
                          nivel3: tools.decrypt(usuario.nivel4),
                          nivel4: tools.decrypt(usuario.nivel1),
                          correo: usuario.email,
                          estado: medios.estado,
                        };
                        listadoReporteCompetencia.push(registro);
                        if (medios.estado != "Aprobado") {
                          aprobado = false;
                        }
                      }
                      for (let altos of competencias.listado_cursos_altos) {
                        let registro = {
                          codigo_cuestionario: altos.idCurso,
                          identificacion: usuario.identificacion,
                          nombre_curso: altos.nombreCurso,
                          proceso: altos.proceso,
                          certificado: "NO",
                          nombre_ruta: competencias.nombreCompetencia,
                          nivel_competencia: "alto",
                          nombre_funcionario: tools.decrypt(usuario.nombres),
                          apellido_funcionario: tools.decrypt(
                            usuario.apellidos
                          ),
                          cargo: tools.decrypt(usuario.cargo),
                          nivel1: tools.decrypt(usuario.nivel2),
                          nivel2: tools.decrypt(usuario.nivel3),
                          nivel3: tools.decrypt(usuario.nivel4),
                          nivel4: tools.decrypt(usuario.nivel1),
                          correo: usuario.email,
                          estado: altos.estado,
                        };
                        listadoReporteCompetencia.push(registro);
                        if (altos.estado != "Aprobado") {
                          aprobado = false;
                        }
                      }
                      for (let superiores of competencias.listado_cursos_superiores) {
                        let registro = {
                          codigo_cuestionario: superiores.idCurso,
                          identificacion: usuario.identificacion,
                          nombre_curso: superiores.nombreCurso,
                          proceso: superiores.proceso,
                          certificado: "NO",
                          nombre_ruta: competencias.nombreCompetencia,
                          nivel_competencia: "superior",
                          nombre_funcionario: tools.decrypt(usuario.nombres),
                          apellido_funcionario: tools.decrypt(
                            usuario.apellidos
                          ),
                          cargo: tools.decrypt(usuario.cargo),
                          nivel1: tools.decrypt(usuario.nivel2),
                          nivel2: tools.decrypt(usuario.nivel3),
                          nivel3: tools.decrypt(usuario.nivel4),
                          nivel4: tools.decrypt(usuario.nivel1),
                          correo: usuario.email,
                          estado: superiores.estado,
                        };
                        listadoReporteCompetencia.push(registro);
                        if (superiores.estado != "Aprobado") {
                          aprobado = false;
                        }
                      }
                      if (aprobado) {
                        for (let cursosCompetencia of listadoReporteCompetencia) {
                          cursosCompetencia.certificado = "SI";
                          listadoReporte.push(cursosCompetencia);
                        }
                      } else {
                        for (let cursosCompetencia of listadoReporteCompetencia) {
                          listadoReporte.push(cursosCompetencia);
                        }
                      }
                    }
                  }
                }
              }
            }

            const csvWriter = createCsvWriter({
              path: "reporte_rutas.csv",
              header: [
                { title: "Código del Curso", id: "codigo_ruta" },
                { title: "Nombre del Curso", id: "nombre_curso" },
                { title: "Nombre de la Ruta", id: "nombre_ruta" },
                { title: "Nivel de Competencia", id: "nivel_competencia" },
                { title: "Proceso", id: "proceso" },
                {
                  title: "Identificación",
                  id: "identificacion",
                },
                {
                  title: "Apellidos del Funcionario",
                  id: "Apellidos_del_Funcionario",
                },
                {
                  title: "Nombres del Funcionario",
                  id: "Nombres_del_Funcionario",
                },
                { title: "Cargo", id: "Cargo" },
                { title: "Nivel 1 del cargo", id: "Nivel_1_del_cargo" },
                { title: "Nivel 2 del cargo", id: "Nivel_2_del_cargo" },
                { title: "Nivel 3 del cargo", id: "Nivel_3_del_cargo" },
                { title: "Nivel 4 del cargo", id: "Nivel_4_del_cargo" },
                { title: "Correo_Electrónico", id: "Correo_Electrónico" },
                { title: "Estado", id: "Estado" },
                { title: "Certificado", id: "certificado" },
              ],
            });
            var records = [];
            listadoReporte.forEach((registro) => {
              records.push({
                codigo_ruta: registro.codigo_cuestionario,
                nombre_curso: registro.nombre_curso,
                nombre_ruta: registro.nombre_ruta,
                nivel_competencia: registro.nivel_competencia,
                Nombres_del_Funcionario: registro.nombre_funcionario,
                Apellidos_del_Funcionario: registro.apellido_funcionario,
                Cargo: registro.cargo,
                Nivel_1_del_cargo: registro.nivel4,
                Nivel_2_del_cargo: registro.nivel1,
                Nivel_3_del_cargo: registro.nivel2,
                Nivel_4_del_cargo: registro.nivel3,
                Correo_Electrónico: registro.correo,
                Estado: registro.estado,
                identificacion: registro.identificacion,
                proceso: registro.proceso,
                certificado: registro.certificado,
              });
            });

            csvWriter
              .writeRecords(records) // returns a promise
              .then(() => {
                console.log("...Done");
                return res.status(200).send({
                  estado: "Descargado",
                  message: util.format(
                    "Archivo de ruta de aprendizaje generado exitosamente"
                  ),
                  data: Object.assign({}),
                });
              });

            /* const workbookOut = new Excel.Workbook();
            const worksheetOut = workbookOut.addWorksheet(
              "reporte usuario cuestionario"
            );
            worksheetOut.columns = [
              { header: "Código", key: "codigo_ruta" },
              { header: "Nombre del Curso", key: "nombre_curso" },
              { header: "Nombre de la Ruta", key: "nombre_ruta" },
              { header: "Nivel de Competencia", key: "nivel_competencia" },
              { header: "Proceso", key: "proceso" },
              {
                header: "Identificación",
                key: "identificacion",
              },
              {
                header: "Apellidos del Funcionario",
                key: "Apellidos_del_Funcionario",
              },
              {
                header: "Nombres del Funcionario",
                key: "Nombres_del_Funcionario",
              },
              { header: "Cargo", key: "Cargo" },
              { header: "Nivel 1 del cargo", key: "Nivel_1_del_cargo" },
              { header: "Nivel 2 del cargo", key: "Nivel_2_del_cargo" },
              { header: "Nivel 3 del cargo", key: "Nivel_3_del_cargo" },
              { header: "Nivel 4 del cargo", key: "Nivel_4_del_cargo" },
              { header: "Correo_Electrónico", key: "Correo_Electrónico" },
              { header: "Estado", key: "Estado" },
              { header: "Certificado", key: "certificado" },

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
                Nivel_1_del_cargo: registro.nivel4,
                Nivel_2_del_cargo: registro.nivel1,
                Nivel_3_del_cargo: registro.nivel2,
                Nivel_4_del_cargo: registro.nivel3,
                Correo_Electrónico: registro.correo,
                Estado: registro.estado,
                identificacion: registro.identificacion,
                proceso: registro.proceso,
                certificado: registro.certificado,
              });
            });
            workbookOut.xlsx.writeFile(documentname).then(() => {
              base64.encode(documentname, function (err, base64String) {
                let respuesta = {
                  documento: base64String,
                  nombreArchivo: "Estado de las rutas de aprendizaje.xlsx",
                };
                return res.status(200).send({
                  estado: "Descargado",
                  message: util.format(
                    "Archivo de ruta de aprendizaje generado exitosamente"
                  ),
                  data: Object.assign(respuesta),
                });
              });
            });*/
          }
        );
      });
    };
    reporteUsuarios(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}
