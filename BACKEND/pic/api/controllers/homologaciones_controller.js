"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
const rutaHandler = require("../../models/ruta_aprendizaje.model");
const tools = require("../utils/tools");
var Excel = require("exceljs");

module.exports = {
  homologacion: homologacion,
};

function homologacion(req, res) {
  try {
    var carga = async (req, res) => {
      try {
        var obtener = tools.decryptJson(req.body.data);
        var data = obtener.archivo.replace(/^data:image\/png;base64,/, "");
        let buff = new Buffer(data, "base64");
        var workbook = new Excel.Workbook();
        const fecha = tools.getFechaActual();
        workbook.xlsx.load(buff).then(function () {
          try {
            var users = [];
            var homologaciones = [];

            var worksheet = workbook.getWorksheet(1);
            var estadoCurso = "";
            var textTemp = "";
            let aux = true;
            worksheet.eachRow(function (row, rowNumber) {
              if (rowNumber != 1) {
                estadoCurso = (row.getCell(3).value + "").trim();
                if (
                  estadoCurso.toUpperCase() == ("Por Cursar").toUpperCase() ||
                  estadoCurso.toUpperCase() == ("Aprobado").toUpperCase() ||
                  estadoCurso.toUpperCase() == ("Reprobado").toUpperCase() ||
                  estadoCurso.toUpperCase() == ("Cursando").toUpperCase() ||
                  estadoCurso.toUpperCase() == ("Eliminar").toUpperCase() ||
                  estadoCurso.toUpperCase() == ("Pendientes de Cupo").toUpperCase()
                ) {

                  var homologacion = {};
                  homologacion.identificacion = (
                    row.getCell(1).value + ""
                  ).trim();
                  homologacion.numero_curso = (
                    row.getCell(2).value + ""
                  ).trim();
                  homologacion.estado = estadoCurso;
                  if (!users.includes((row.getCell(1).value + "").trim())) {
                    users.push((row.getCell(1).value + "").trim());
                  }

                  switch (homologacion.estado.trim()) {
                    case "Por Cursar":
                      homologacion.colorEstado = "#F0D133";
                      break;
                    case "Aprobado":
                      homologacion.colorEstado = "#63bc5f";
                      break;
                    case "Reprobado":
                      homologacion.colorEstado = "#F25C54";
                      break;
                    default:
                      homologacion.colorEstado = "#65B1D9";
                      break;
                  }
                  homologaciones.push(homologacion);
                }
              }
            });

            rutaHandler.find(
              { identificacion: { $in: users } },
              (err, rutasEncontradas) => {
                if (err) {
                  return res.status(603).send({
                    estado: "error",
                    message: util.format(err),
                    data: Object.assign({}),
                  });
                }
                if (!rutasEncontradas) {
                  return res.status(603).send({
                    estado: "Error",
                    message: "Rutas no encontrado.",
                    data: Object.assign({}),
                  });
                }
                homologaciones.forEach((homologacionIndependiente) => {
                  rutasEncontradas.forEach((rutaIndividual) => {
                    if (
                      homologacionIndependiente.identificacion ==
                      rutaIndividual.identificacion
                    ) {
                      rutaIndividual.listado_competencias.forEach(
                        (competencia) => {
                          competencia.listado_cursos_basicos.forEach(
                            (cursoBasico) => {
                              if (
                                homologacionIndependiente.numero_curso ==
                                cursoBasico.idCurso
                              ) {
                                cursoBasico.estado =
                                  homologacionIndependiente.estado;
                                cursoBasico.colorEstado =
                                  homologacionIndependiente.colorEstado;
                              }
                            }
                          );
                          competencia.listado_cursos_medios.forEach(
                            (cursoMedio) => {
                              if (
                                homologacionIndependiente.numero_curso ==
                                cursoMedio.idCurso
                              ) {
                                cursoMedio.estado =
                                  homologacionIndependiente.estado;
                                cursoMedio.colorEstado =
                                  homologacionIndependiente.colorEstado;
                              }
                            }
                          );
                          competencia.listado_cursos_altos.forEach(
                            (cursoAltos) => {
                              if (
                                homologacionIndependiente.numero_curso ==
                                cursoAltos.idCurso
                              ) {
                                cursoAltos.estado =
                                  homologacionIndependiente.estado;
                                cursoAltos.colorEstado =
                                  homologacionIndependiente.colorEstado;
                              }
                            }
                          );
                          competencia.listado_cursos_superiores.forEach(
                            (cursoSuperiores) => {
                              if (
                                homologacionIndependiente.numero_curso ==
                                cursoSuperiores.idCurso
                              ) {
                                cursoSuperiores.estado =
                                  homologacionIndependiente.estado;
                                cursoSuperiores.colorEstado =
                                  homologacionIndependiente.colorEstado;
                              }
                            }
                          );
                        }
                      );
                    }
                  });
                });

                rutaHandler.bulkWrite(
                  rutasEncontradas.map((rutaInd) => ({
                    updateOne: {
                      filter: { identificacion: rutaInd.identificacion },
                      update: {
                        $set: {
                          listado_competencias: rutaInd.listado_competencias,
                        },
                      },
                      upsert: true,
                    },
                  })),
                  (err, rutaActualizada) => {
                    if (err) {
                      return res.status(603).send({
                        estado: "error",
                        message: util.format(err),
                        data: Object.assign({}),
                      });
                    }
                    if (!rutaActualizada) {
                      return res.status(603).send({
                        estado: "Error",
                        message: "Rutas no encontrado.",
                        data: Object.assign({}),
                      });
                    }
                    return res.status(200).send({
                      estado: "Exito",
                      message: util.format(
                        "Homologaciones registradas exitosamente"
                      ),
                      data: Object.assign({}),
                    });
                  }
                );
              }
            );
          } catch (error) {
            return res.status(601).send({
              estado: "Homologaciones vacias",
              message: util.format("No hay registros"),
              data: Object.assign({}),
            });
          }
        });
      } catch (error) {
        return res.status(602).send({
          estado: "demoro",
          message: util.format("Error procesando el archivo"),
          data: Object.assign({}),
        });
      }
    };
    carga(req, res);
  } catch (error) {
    throw boom.boomify(error);
  }
}

function verify(req, res, next) {
  var dec = decryptJson(req.body.data);
  jwt.verify(dec.token, "my-secret", (err, data) => {
    if (err) {
      return res.status(601).send({
        estado: "error",
        message: "error token invalido",
        //data: Object.assign(token)
      });
    } else {
      next();
    }
  });
}
