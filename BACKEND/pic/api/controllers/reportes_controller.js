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
      let listadoReporte = [];
      let documentname = "Número total de inscrito por curso";

      cuestionarioHandler.find((err, cuestionarios) => {
        let usuariosId = [];
        for (let element of cuestionarios) {
          usuariosId.push(element.email);
        }

        usuariosHandler
          .find({ email: { $in: usuariosId } }, (err, usuarios) => {
            for (let element of cuestionarios) {
              for (let usuario of usuarios) {
                let respondidas= 0;
                let totales = 0;

                totales += element.listado_preguntas.length;
                totales += element.listado_preguntas_seccion_iii.length;
                element.listado_preguntas.forEach((preguntas) => {
                  if (preguntas.estado_respuesta == "Respondida") {
                    respondidas++;
                  }
                });
                element.listado_preguntas_seccion_iii.forEach((preguntas) => {
                  if (preguntas.estado_respuesta == "Respondida") {
                    respondidas++;
                  }
                });
                let avanceActual = (respondidas * 100) / totales;

                let registro = {
                  codigo_cuestionario: element._id,
                  identificacion: element.id_colaborador,
                  apellidos_funcionario: tools.decrypt(usuario.apellidos),
                  nombre_funcionario: tools.decrypt(usuario.nombres),
                  cargo: tools.decrypt(usuario.cargo),
                  nivel1: tools.decrypt(usuario.nivel1),
                  nivel2: tools.decrypt(usuario.nivel2),
                  nivel3: tools.decrypt(usuario.nivel3),
                  correo: tools.decrypt(usuario.email),
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
                Correo_Electrónico: registro.email,
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
          .catch((err) => {
            return res.status(603).send({
              estado: "Error",
              message: util.format("Error generando el reporte"),
              data: Object.assign({ err: err }),
            });
          });
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
      let filename = 'Respuestas del cuestionario Sección I';
      cuestionarioHandler.find((err, cuestionarios) => {
        let usuariosId = [];
        for (let element of cuestionarios) {
          usuariosId.push(element.email);
        }

        usuariosHandler.find(
          { email: { $in: usuariosId } },
          (err, usuarios) => {
            for (let element of cuestionarios) {
              for (let usuario of usuarios) {
                if (usuario) {
                  if (dec.seccion == "I") {
                    element.listado_competencias.forEach((pregunta) => {                     
                      let registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.id_colaborador,
                        apellidos_funcionario: tools.decrypt(usuario.nombres),
                        nombre_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: (usuario.email),
                        seccion: "seccion I",                        
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
              { header: "Apellidos_del_Funcionario",key: "Apellidos_del_Funcionario",},
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
                Correo_Electrónico: registro.email,
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
      let filename = 'Respuestas del cuestionario Sección II';
      cuestionarioHandler.find((err, cuestionarios) => {
        let usuariosId = [];
        for (let element of cuestionarios) {
          usuariosId.push(element.email);
        }

        usuariosHandler.find(
          { email: { $in: usuariosId } },
          (err, usuarios) => {
            for (let element of cuestionarios) {
              for (let usuario of usuarios) {
                if (usuario) {
                  if (dec.seccion == "I") {
                    for (let i = 0; i < element.listado_competencias.length; i++){  
                      for (let cursos of element.listado_cursos){                                      
                      let registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.id_colaborador,
                        apellidos_funcionario: tools.decrypt(usuario.nombres),
                        nombre_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: (usuario.email),
                        seccion: "seccion II",                        
                        codigo_competencia: element.listado_competencias[i].nombreCompetencia, 
                        id_curso:  cursos.idCurso, 
                        nombre_curso: cursos.nombreCurso,                      
                        enunciado_respuesta: element.listado_competencias[i].valor_respuesta,
                        estado: element.listado_competencias[i].estado_respuesta,
                      };
                      listado.push(registro);
                      i++;
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
              { header: "seccion", key: "seccion" },
              { header: "Codigo", key: "Codigo" },
              { header: "id_curso", key: "id_curso" },
              { header: "nombre_curso", key: "nombre_curso" },
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
                Correo_Electrónico: registro.email,
                seccion: registro.seccion,
                Codigo: registro.codigo_competencia,
                id_curso: registro.id_curso,
                nombre_curso: registro.nombre_curso,
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

function preguntas_Usuarioiii(req, res) {
  try {
    var preguntas_seccion1 = async (req, res) => {
      let listado = [];
      let filename = 'Respuestas del cuestionario Sección III';
      cuestionarioHandler.find((err, cuestionarios) => {
        let usuariosId = [];
        for (let element of cuestionarios) {
          usuariosId.push(element.email);
        }

        usuariosHandler.find(
          { email: { $in: usuariosId } },
          (err, usuarios) => {
            for (let element of cuestionarios) {
              for (let usuario of usuarios) {
                if (usuario) {                  
                    for (let pregunta of  element.listado_preguntas){ 
                      let preguntaBus = await preguntashandler.findOne({numero_pregunta:pregunta.id_pregunta});                                                                              
                      let registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.id_colaborador,
                        apellidos_funcionario: tools.decrypt(usuario.nombres),
                        nombre_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: (usuario.email),
                        seccion: "seccion III",                        
                        codigo_pregunta: pregunta.id_pregunta, 
                        situacion:  preguntaBus.situacionProblema, 
                        enunciado: preguntaBus.encabezadoPregunta,                      
                        enunciado_respuesta: pregunta.valor_respuesta,
                        estado: pregunta.estado_respuesta,
                      };
                      listado.push(registro);                     
                    };
                    for (let pregunta of  element.listado_preguntas_seccion_iii){ 
                      for (let preguntam of preguntasiiihandler.preguntasMock){
                        if(preguntam.idPregunta == pregunta.id_pregunta){
                           let preguntabus = preguntam;
                           break;
                        }
                      }                                                             
                      let registro = {
                        codigo_cuestionario: element._id,
                        identificacion: usuario.id_colaborador,
                        apellidos_funcionario: tools.decrypt(usuario.nombres),
                        nombre_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: (usuario.email),
                        seccion: "seccion III",                        
                        codigo_pregunta: pregunta.id_pregunta, 
                        situacion:  preguntabus.situacion_problema, 
                        enunciado: preguntabus.encabezado_pregunta,                      
                        enunciado_respuesta: pregunta.valor_respuesta,
                        estado: pregunta.estado_respuesta,
                      };
                      listado.push(registro);                      
                    };                
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
              { header: "situacion", key: "situacion" },
              { header: "enunciado", key: "enunciado" },
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
                Correo_Electrónico: registro.email,
                seccion: registro.seccion,
                Codigo: registro.codigo_competencia,
                situacion: registro.situacion,
                enunciado: registro.enunciado,
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
                        codigo_cuestionario: element.id_ruta,
                        nombre_curso: basicos.nombreCurso,
                        nombre_ruta: competencias.nombreCompetencia,
                        nivel_competencia: "basico",
                        nombre_funcionario: tools.decrypt(usuario.nombres),
                        apellido_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: tools.decrypt(usuario.email),
                        estado: basicos.estado,
                      };
                      listadoReporte.push(registro);
                    }
                    for (let medios of competencias.listado_cursos_medios) {
                      let registro = {
                        codigo_cuestionario: element.id_ruta,
                        nombre_curso: medios.nombreCurso,
                        nombre_ruta: competencias.nombreCompetencia,
                        nivel_competencia: "medio",
                        nombre_funcionario: tools.decrypt(usuario.nombres),
                        apellido_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: tools.decrypt(usuario.email),
                        estado: medios.estado,
                      };
                      listadoReporte.push(registro);
                    }
                    for (let altos of competencias.listado_cursos_altos) {
                      let registro = {
                        codigo_cuestionario: element.id_ruta,
                        nombre_curso: altos.nombreCurso,
                        nombre_ruta: competencias.nombreCompetencia,
                        nivel_competencia: "alto",
                        nombre_funcionario: tools.decrypt(usuario.nombres),
                        apellido_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: tools.decrypt(usuario.email),
                        estado: altos.estado,
                      };
                      listadoReporte.push(registro);
                    }
                    for (let superiores of competencias.listado_cursos_superiores) {
                      let registro = {
                        codigo_cuestionario: element.id_ruta,
                        nombre_curso: superiores.nombreCurso,
                        nombre_ruta: competencias.nombreCompetencia,
                        nivel_competencia: "superior",
                        nombre_funcionario: tools.decrypt(usuario.nombres),
                        apellido_funcionario: tools.decrypt(usuario.apellidos),
                        cargo: tools.decrypt(usuario.cargo),
                        nivel1: tools.decrypt(usuario.nivel1),
                        nivel2: tools.decrypt(usuario.nivel2),
                        nivel3: tools.decrypt(usuario.nivel3),
                        correo: tools.decrypt(usuario.email),
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
                { header: "nombre_curso", key: "nombre_curso" },
                { header: "nombre_ruta", key: "nombre_ruta" },
                { header: "nivel_competencia", key: "nivel_competencia" },
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
                  Correo_Electrónico: registro.email,
                  Estado: registro.estado,
                });
              });
              workbookOut.xlsx
                .writeFile(documentname)
                .then(() => {
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
                })
                .catch((err) => {
                  return res.status(603).send({
                    estado: "Error",
                    message: util.format("Error generando el reporte"),
                    data: Object.assign({ err: err }),
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
