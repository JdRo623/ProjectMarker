"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
const Pregunta = require("../../models/preguntas_seccion_iii_i.model");
var tools = require("../utils/tools.js");
var preguntas_seccionIII = require("../utils/preguntasSeccionIII.js");
const cuestionarioHandler = require("../../models/Cuestionario.model");

var Excel = require("exceljs");
const { preguntasMock } = require("../utils/preguntasSeccionIII.js");

module.exports = {
  registrarPreguntas_iii_i: registrarPreguntas_iii_i,
  obtenerPreguntas_iii_i: obtenerPreguntas_iii_i,
};

function registrarPreguntas_iii_i(req, res) {
  try {
    var cargar = async (req, res) => {
      try {
        var reqDecrypt = tools.decrypt(req.body.data);
        var fecha = tools.getFechaActual(); /*.replace(':','');
                    fecha = fecha.replace(' ','');*/
        var documentName = "C:/archivos_preguntas/preguntas" + fecha + ".xlsx";
        var data = reqDecrypt.archivo;
        data = data.replace(/^data:image\/png;base64,/, "");
        let buff = new Buffer(data, "base64");

        var workbook = new Excel.Workbook();
        workbook.xlsx.load(buff).then(function () {
          try {
            var worksheet = workbook.getWorksheet("Preguntas específicas");
            var rowCount = 2;
            var preguntasDefinitiva = [];
            if (worksheet) {
              if (true /*validarFormato(worksheet.getRow(1))*/) {
                do {
                  var row = worksheet.getRow(rowCount);
                  var pregunta = {
                    fecha_registro: fecha,
                    consecutivo:
                      row.getCell(4).value + tools.generadorConsecutivo(),
                  };

                  var numValues = row.actualCellCount;
                  if (numValues == 0) break;
                  pregunta.cargo = row.getCell(1).value + "";
                  pregunta.competencia = row.getCell(4).value + "";
                  pregunta.proceso = row.getCell(2).value + "";
                  pregunta.subproceso = row.getCell(3).value + "";
                  pregunta.subcompetencia = row.getCell(5).value + "";
                  pregunta.enunciado = row.getCell(6).value + "";
                  (pregunta.respuestas = [
                    {
                      cod_respuesta: "a",
                      descriptor: row.getCell(7).value + "",
                    },
                    {
                      cod_respuesta: "b",
                      descriptor: row.getCell(8).value + "",
                    },
                    {
                      cod_respuesta: "c",
                      descriptor: row.getCell(9).value + "",
                    },
                    {
                      cod_respuesta: "d",
                      descriptor: row.getCell(10).value + "",
                    },
                    {
                      cod_respuesta: "e",
                      descriptor: row.getCell(11).value + "",
                    },
                  ]),
                    (pregunta.cod_respuesta_correcta = "N/A");
                  pregunta.valor_pregunta = "N/A";
                  pregunta.aleatorio = "1";
                  pregunta.eje_tematico = row.getCell(12).value + "";
                  pregunta.tematica = row.getCell(13).value + "";

                  preguntasDefinitiva.push(pregunta);

                  rowCount++;
                } while (rowCount <= 5001);

                var old = JSON.stringify(preguntasDefinitiva).replace(
                  /null/g,
                  "N/A"
                ); //convert to JSON string
                var newArray = JSON.parse(old);
                Pregunta.insertMany(newArray, (err, miembros) => {
                  if (err)
                    return res.status(500).send({
                      estado: "Error",
                      message: "Error en la petición",
                      data: Object.assign({ error: err }),
                    });
                  if (!miembros)
                    return res.status(200).send({
                      estado: "Error",
                      message: "No fue posible registrar los miembros",
                      data: Object.assign({}),
                    });

                  return res.status(200).send({
                    estado: "Preguntas registradas",
                    message: util.format("Archivo procesado exitosamente"),
                    data: Object.assign({}),
                  });
                });
              } else {
                console.log("Formato del documento no es valido");
                return res.status(200).send({
                  estado: "Error",
                  message: "Formato del documento no es valido",
                  data: Object.assign({}),
                }); // listaMiembrosInvalidos.push(a);
              }
            } else {
              console.log("Formato del documento no es valido");
              return res.status(200).send({
                estado: "Error",
                message: "Formato del documento no es valido",
                data: Object.assign({}),
              }); // listaMiembrosInvalidos.push(a);
            }
          } catch (err) {
            return res.status(200).send({
              estado: "Preguntas NO registradas",
              message: util.format("Formato del documento no es valido"),
              data: Object.assign({}),
            });
          }
        });
      } catch (err) {
        return res.status(200).send({
          estado: "Preguntas NO registradas",
          message: util.format("Formato del documento no es valido"),
          data: Object.assign({}),
        });
      }
    };
    cargar(req, res);
  } catch (err) {
    res.json(err);
    throw boom.boomify(err);
  }
}

function obtenerPreguntas_iii_i(req, res) {
  try {
    var obtener = async (req, res) => {
      var reqDecrypt = tools.decryptJson(req.body.data);
      var preguntasEnviar = [];

      cuestionarioHandler.findOne(
        { email: reqDecrypt.email },
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
          cuestionarioBuscado.listado_preguntas_seccion_iii.forEach(
            (pregunta) => {
              preguntas_seccionIII.preguntasMock.forEach((preguntaMock) => {
                if (preguntaMock.idPregunta == pregunta.id_pregunta) {
                  if (pregunta.estado_preguntas == "No respondida") {
                    preguntasEnviar.push(preguntaMock);
                  }
                }
              });
            }
          );

          return res.status(200).send({
            estado: "Obtenidas",
            message: util.format(
              "Preguntas de la sección III obtenidas exitosamente"
            ),
            data: Object.assign(preguntasEnviar),
          });
        }
      );

      /* await Pregunta.find(filtros, (err, preguntaG) => {
                if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign({}) });
                if (!preguntaG) return res.status(200).send({ estado: 'Error', message: 'No hay ninguna pregunta registrada en el momento', data: Object.assign({}) });
                return res.status(200).send({
                    estado: 'Obtenidas',
                    message: util.format("Preguntas de la sección I obtenidas exitosamente"),
                    data: Object.assign(preguntaG)
                });
            });*/
    };
    obtener(req, res);
  } catch (err) {
    throw boom.boomify(err);
  }
}
