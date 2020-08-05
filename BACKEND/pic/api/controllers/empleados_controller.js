"use strict";
const jwt = require("jsonwebtoken");
var util = require("util");
const boom = require("boom");
const config = require("../../config.json");
const EmpleadosModel = require("../../models/empleado.model");


var tools = require("../utils/tools.js");
var Excel = require("exceljs");

module.exports = {
  registrarEmpleados: registrarEmpleados,
  obtenerEmpleado: obtenerEmpleado,
};

function obtenerEmpleado(req, res) {
  try {
    var obtener = async (req, res) => {
      var reqDecrypt = tools.decrypt(req.body.data);
      const filtros = {
        identificacion: reqDecrypt.identificacion,
      };
      await EmpleadosModel.findOne(filtros, (err, empleado) => {
        if (err)
          return res
            .status(500)
            .send({
              estado: "Error",
              message: "Error en la petición",
              data: Object.assign(),
            });
        if (!empleado) {
          return res
            .status(200)
            .send({
              estado: "Error",
              message: "No existe el empleado",
              data: Object.assign(),
            });
        } else {
          var empleadoDesencriptado = {
            identificacion: empleado.identificacion,
            nombres: tools.decrypt(nombres.identificacion),
            apellidos: tools.decrypt(apellidos.identificacion),
            cargo: tools.decrypt(cargo.identificacion),
            direccion_seccional: tools.decrypt(
              direccion_seccional.identificacion
            ),
            subdireccion: tools.decrypt(subdireccion.identificacion),
            fecha_registro: tools.decrypt(fecha_registro.identificacion),
            coordinacion: tools.decrypt(coordinacion.identificacion),
          };

          return res.status(200).send({
            estado: "Empleado Encontrado",
            message: util.format("Información Obtenida"),
            data: Object.assign(empleadoDesencriptado),
          });
        }
      });
    };
    obtener(req, res);
  } catch (err) {
    throw boom.boomify(err);
  }
}

function registrarEmpleados(req, res) {
  try {
    var cargar = async (req, res) => {
      try {
        var reqDecrypt = tools.decryptJson(req.body.data);
        var fecha = tools.getFechaActual(); /*.replace(':','');
                fecha = fecha.replace(' ','');*/
        var data = reqDecrypt.archivo;
        data = data.replace(/^data:image\/png;base64,/, "");
        let buff = new Buffer(data, "base64");

        var workbook = new Excel.Workbook();
        workbook.xlsx.load(buff).then(function () {
          try {
            var worksheet = workbook.getWorksheet(1);
            var rowCount = 2;
            var empleadosDefinitivos = [];
            var seccionalDefinitivos = [];
            var subgruposDefinitivos = [];
            var coordinacionesDefinitivos = [];

            var seccionalTemporales = [];
            var subgruposTemporales = [];
            var coordinacionesTemporales = [];

            var textTemp = "";
            if (worksheet) {
              do {
                var empleado = {
                  fecha_registro: fecha,
                };
                var row = worksheet.getRow(rowCount);

                var numValues = row.actualCellCount;
                if (numValues == 0) break;

                empleado.nombres = tools.encrypt(row.getCell(10).value + "");
                empleado.apellidos = tools.encrypt(row.getCell(11).value + "");
                empleado.nombres_jefe = tools.encrypt(row.getCell(15).value + "");
                empleado.apellidos_jefe = tools.encrypt(
                  row.getCell(16).value + ""
                );
                empleado.Fecha_Inicio = tools.encrypt(row.getCell(13).value + "");
                empleado.email = row.getCell(9).value + "";
                empleado.identificacion = tools.encrypt(
                  row.getCell(8).value + ""
                );
                empleado.ciudad = row.getCell(7).value + "";
                empleado.cargo = tools.encrypt(row.getCell(1).value + "");
                empleado.descripccion_cargo = tools.encrypt(
                  row.getCell(6).value + ""
                );
                empleado.nivel1 = tools.encrypt((row.getCell(2).value + "").trim());
                empleado.nivel2 = tools.encrypt((row.getCell(3).value + "").trim());
                empleado.nivel3 = tools.encrypt((row.getCell(4).value + "").trim());
                empleado.nivel4 = tools.encrypt((row.getCell(5).value + "").trim());
                empleado.fecha_registro = fecha;
                empleado.estado_encuesta;
                empleadosDefinitivos.push(empleado);
                rowCount++;

                textTemp = (row.getCell(3).value + "").trim();
                if (!seccionalTemporales.includes(textTemp)) {
                  seccionalTemporales.push(textTemp);
                  seccionalDefinitivos.push({
                    nombre: textTemp,
                    fecha_registro: fecha,
                  });
                }
                textTemp = (row.getCell(4).value + "").trim();
                if (!subgruposTemporales.includes(textTemp)) {
                  subgruposTemporales.push(textTemp);
                  subgruposDefinitivos.push({
                    nombre: textTemp,
                    fecha_registro: fecha,
                  });
                }
                textTemp = (row.getCell(5).value + "").trim();
                if (!coordinacionesTemporales.includes(textTemp)) {
                  coordinacionesTemporales.push(textTemp);
                  coordinacionesDefinitivos.push({
                    nombre: textTemp,
                    fecha_registro: fecha,
                  });
                }
              } while (rowCount <= 10700);

              console.log(seccionalDefinitivos);
              console.log(subgruposDefinitivos);
              console.log(coordinacionesDefinitivos);

              var old = JSON.stringify(empleadosDefinitivos).replace(
                /null/g,
                "N/A"
              ); //convert to JSON string
              var newArray = JSON.parse(old);
              EmpleadosModel.insertMany(newArray, (err, empleados) => {
                if (err)
                  return res
                    .status(500)
                    .send({
                      estado: "Error",
                      message: "Error en la petición",
                      data: Object.assign({ error: err }),
                    });
                if (!empleados)
                  return res
                    .status(200)
                    .send({
                      estado: "Error",
                      message: "No fue posible registrar los miembros",
                      data: Object.assign({}),
                    });
                return res.status(200).send({
                  estado: "Empleados registrados",
                  message: util.format("Archivo procesado exitosamente"),
                  data: Object.assign({}),
                });
              });
            } else {
              console.log("Formato del documento no es valido");
              return res
                .status(200)
                .send({
                  estado: "Error",
                  message: "Formato del documento no es valido POR LA HOJA",
                  data: Object.assign({}),
                }); // listaMiembrosInvalidos.push(a);
            }
          } catch (err) {
            return res.status(200).send({
              estado: "Empleados NO registrados",
              message: util.format("Error procesando el archivo"),
              data: Object.assign({}),
            });
          }
        });
      } catch (err) {
        return res.status(200).send({
          estado: "Empleados NO registrado",
          message: util.format(
            "Formato del documento no es valido por general " + err
          ),
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
