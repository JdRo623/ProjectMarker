'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const EmpleadosModel = require('../../models/empleado.model');
var tools = require('../utils/tools.js');
var Excel = require('exceljs');

module.exports = {
    registrarEmpleados: registrarEmpleados,
    obtenerEmpleado: obtenerEmpleado,
};

function obtenerEmpleado(req, res) {
    try {
        var obtener = async (req, res) => {
            var reqDecrypt = (tools.decrypt(req.body.data))
            const filtros = {
                identificacion: reqDecrypt.identificacion
            }
            await EmpleadosModel.findOne(filtros, (err, empleado) => {
                if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign() });
                if (!empleado) {
                    return res.status(200).send({ estado: 'Error', message: 'No existe el empleado', data: Object.assign() });
                } else {

                    var empleadoDesencriptado = {
                        "identificacion" : empleado.identificacion,
                        "nombres": tools.decrypt(nombres.identificacion),
                        "apellidos": tools.decrypt(apellidos.identificacion),
                        "cargo": tools.decrypt(cargo.identificacion),
                        "direccion_seccional": tools.decrypt(direccion_seccional.identificacion),
                        "subdireccion": tools.decrypt(subdireccion.identificacion),
                        "fecha_registro": tools.decrypt(fecha_registro.identificacion),
                        "coordinacion": tools.decrypt(coordinacion.identificacion)
                    }

                    return res.status(200).send({
                        estado: 'Empleado Encontrado',
                        message: util.format('Información Obtenida'),
                        data: Object.assign(empleadoDesencriptado)
                    });
                }
            });
        }
        obtener(req, res)
    } catch (err) {
        throw boom.boomify(err)
    }

}

function registrarEmpleados(req, res) {
    try {
        var cargar = async (req, res) => {
            try {
                var reqDecrypt = (tools.decrypt(req.body.data))
                var fecha = tools.getFechaActual()/*.replace(':','');
                fecha = fecha.replace(' ','');*/
                var data = reqDecrypt.archivo;
                console.log(data);
                data = data.replace(/^data:image\/png;base64,/, "");
                let buff = new Buffer(data, 'base64');

                var workbook = new Excel.Workbook();
                workbook.xlsx.load(buff)
                    .then(function () {
                        try {
                            var worksheet = workbook.getWorksheet('KactuS - KNmContr');
                            var rowCount = 2;
                            var empleadosDefinitivos = [];
                            if (worksheet) {
                                do {
                                    var empleado = {
                                        fecha_registro: fecha
                                    };
                                    var row = worksheet.getRow(rowCount);


                                    var numValues = row.actualCellCount;
                                    if (numValues == 0) break;
                                    empleado.identificacion = row.getCell(1).value + ""
                                    empleado.nombres = tools.encrypt(row.getCell(2).value + "")
                                    empleado.apellidos = tools.encrypt(row.getCell(3).value + "")
                                    empleado.cargo = tools.encrypt(row.getCell(4).value + "")
                                    empleado.direccion_seccional = tools.encrypt(row.getCell(5).value + "")
                                    empleado.subdireccion = tools.encrypt(row.getCell(6).value + "")
                                    empleado.coordinacion = tools.encrypt(row.getCell(7).value + "")
                                    empleadosDefinitivos.push(empleado);
                                    rowCount++;
                                } while (rowCount <= 11000)

                                var old = JSON.stringify(empleadosDefinitivos).replace(/null/g, 'N/A'); //convert to JSON string
                                var newArray = JSON.parse(old);
                                EmpleadosModel.insertMany(newArray, (err, empleados) => {
                                    if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign({ "error": err }) });
                                    if (!empleados) return res.status(200).send({ estado: 'Error', message: 'No fue posible registrar los miembros', data: Object.assign({}) });
                                    return res.status(200).send({
                                        estado: 'Empleados registrados',
                                        message: util.format("Archivo procesado exitosamente"),
                                        data: Object.assign({})
                                    });

                                });
                            } else {
                                console.log('Formato del documento no es valido');
                                return res.status(200).send({ estado: 'Error', message: 'Formato del documento no es valido POR LA HOJA', data: Object.assign({}) });                                   // listaMiembrosInvalidos.push(a);
                            }

                        } catch (err) {
                            return res.status(200).send({
                                estado: 'Empleados NO registrados',
                                message: util.format("Error procesando el archivo"),
                                data: Object.assign({})
                            });
                        }
                    });
            } catch (err) {
                return res.status(200).send({
                    estado: 'Empleados NO registrado',
                    message: util.format("Formato del documento no es valido por general " + err),
                    data: Object.assign({})
                });
            }
        }
        cargar(req, res);
    } catch (err) {
        res.json(err);
        throw boom.boomify(err)
    }

}