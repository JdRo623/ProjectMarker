'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const CursosHandler = require('../../models/curso.model');
const RolHandler = require('../../models/subgrupo.model');
const SeccionalHandler = require('../../models/seccionales.model');
var base64 = require('file-base64');
var tools = require('../utils/tools.js');
var Excel = require('exceljs');

module.exports = {
    registrarActividades: registrarActividades,
    informePIC: informePIC
};

function verificarExistencia(seccionales, seccionalCheck) {
    var rolEncontrado;
    seccionales.forEach(element => {
        if (element.nombre) {
            if (element.nombre.localeCompare(seccionalCheck.nombre) == 0) {
                rolEncontrado = true
            }
        }

    });
    return rolEncontrado;
}

function registrarActividades(req, res) {
    try {
        var cargar = async (req, res) => {
            try {
                var reqDecrypt = (tools.decryptJson(req.body.data))
                var fecha = tools.getFechaActual()/*.replace(':','');
                fecha = fecha.replace(' ','');*/
                var data = reqDecrypt.archivo;
                data = data.replace(/^data:image\/png;base64,/, "");
                let buff = new Buffer(data, 'base64');

                var workbook = new Excel.Workbook();
                workbook.xlsx.load(buff)
                    .then(function () {
                        try {
                            var rowCount = 3;
                            var columCountRol = 27;
                            var actividades = [];
                            var subGrupos = [];
                            var seccionales = [];
                            var seccional = {}
                            var subgrupoTempo;
                            var cursosTemp = [];
                            var cursoTemp
                            var row;
                            var colum;
                            var cargosTemp
                            const worksheet = workbook.getWorksheet('Cursos')

                            do {
                                colum = worksheet.getColumn(columCountRol);
                                cursosTemp = []
                                subgrupoTempo = {
                                    fecha_registro: fecha,
                                }
                                seccional = { fecha_registro: fecha, }

                                colum.eachCell(function (cell, rowNumber) {
                                    cursoTemp = {}
                                    cargosTemp = []
                                    if (cell.value) {
                                        if (rowNumber == 1) {
                                            seccional.nombre = cell.value + ""
                                            subgrupoTempo.direccion = cell.value + ""
                                        } else if (rowNumber == 2) {
                                            subgrupoTempo.nombre = cell.value + ""
                                        } else {
                                            cursoTemp.idCurso = worksheet.getRow(rowNumber).getCell(1).value + ""
                                            cursoTemp.cargos = (cell.value.
                                                replace(/\n/g, '').
                                                replace(/\r/g, '').
                                                split(";"))
                                            cursoTemp.cargos.forEach(cargo => {
                                                if (cargo.localeCompare('') != 0) {
                                                    cargosTemp.push(cargo.trim())
                                                }
                                            });
                                            cursoTemp.cargos = cargosTemp
                                            cursosTemp.push(cursoTemp)
                                        }
                                    }

                                });
                                subgrupoTempo.cursos = cursosTemp
                                if (!verificarExistencia(seccionales, seccional)) seccionales.push(seccional)
                                subGrupos.push(subgrupoTempo)
                                columCountRol++;
                            } while (columCountRol <= 754)
                            do {
                                var actividad = {
                                    fecha_registro: fecha,
                                };
                                row = worksheet.getRow(rowCount);

                                var numValues = row.actualCellCount;
                                if (numValues == 0) break;
                                if (!row.getCell(1).value) break;

                                actividad.consecutivo = row.getCell(1).value + ""
                                actividad.proceso = row.getCell(2).value + ""
                                actividad.proceso_comun = row.getCell(3).value + ""
                                actividad.competencia = row.getCell(4).value + ""
                                actividad.descripcion_competencia = row.getCell(5).value + ""
                                actividad.eje_funcion_publica = row.getCell(6).value + ""
                                actividad.eje_pilar_dian = row.getCell(7).value + ""
                                actividad.eje_tematico_pic = row.getCell(8).value + ""
                                actividad.tema_central = row.getCell(9).value + ""
                                actividad.nombre_actividad = row.getCell(10).value + ""
                                actividad.modalidad = row.getCell(11).value + ""
                                actividad.tipo_oferta = row.getCell(12).value + ""
                                actividad.relacion_programas_anteriores = row.getCell(13).value + ""
                                actividad.cantidad_participantes_sugerida_total = row.getCell(14).value + ""
                                actividad.cantidad_participantes_sugerida_grupo = row.getCell(15).value + ""
                                actividad.cantidad_participantes = row.getCell(16).value + ""
                                actividad.nivel_ruta = row.getCell(17).value + ""
                                actividad.intencidad_horaria = row.getCell(18).value + ""
                                actividad.objetivo_actividad = row.getCell(19).value + ""
                                actividad.resumen_contenido = row.getCell(20).value + ""
                                actividad.bibliografia = row.getCell(21).value + ""
                                actividad.perfil_conferencista = row.getCell(22).value + ""
                                actividad.pre_requisitos = row.getCell(23).value + ""
                                actividad.fecha_ejecucion = row.getCell(24).value + ""
                                actividad.necesidad_capacitacion = row.getCell(25).value + ""
                                actividad.incidentes_criticos = row.getCell(26).value + ""
                                actividades.push(actividad);
                                rowCount++;
                            } while (rowCount <= 200)
                            // var old = JSON.stringify(actividades).replace(/null/g, 'N/A'); //convert to JSON string
                            // var newArray = JSON.parse(old);
                            CursosHandler.insertMany(actividades, (err, actividades) => {
                                if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign({ "error": err }) });
                                if (!actividades) return res.status(200).send({ estado: 'Error', message: 'No fue posible registrar las actividades', data: Object.assign({}) });
                                //old = JSON.stringify(subGrupos).replace(/null/g, 'N/A'); //convert to JSON string
                                //newArray = JSON.parse(old);
                                RolHandler.insertMany(subGrupos, (err, roles) => {
                                    if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign({ "error": err }) });
                                    if (!roles) return res.status(200).send({ estado: 'Error', message: 'No fue posible registrar los roles', data: Object.assign({}) });
                                    SeccionalHandler.insertMany(seccionales, (err, sec) => {
                                        if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign({ "error": err }) });
                                        if (!sec) return res.status(200).send({ estado: 'Error', message: 'No fue posible registrar los roles', data: Object.assign({}) });
                                        return res.status(200).send({
                                            estado: 'Actividades registradas',
                                            message: util.format("Archivo procesado exitosamente"),
                                            data: Object.assign({})
                                        });
                                    });

                                });
                            });


                        } catch (err) {
                            console.error(err)
                            return res.status(200).send({
                                estado: 'Actividades NO registradas',
                                message: util.format("Formato del documento no es valido " + err),
                                data: Object.assign({})
                            });
                        }
                    });
            } catch (err) {
                console.error(err)

                return res.status(200).send({

                    estado: 'Preguntas NO registradas',
                    message: util.format("Formato del documento no es valido " + err),
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
function informePIC(req, res) {
    try {
        var cargar = async (req, res) => {
            try {
                var fecha = tools.getFechaActual()/*.replace(':','');
                fecha = fecha.replace(' ','');*/
                var cursos = []
                var filtroRol = {}
                var matrizCursosSeccional = []
                var columnaCarrier = 3
                var documentName = "C:/Software/plantilla.xlsx";
                var dobCol
                var workbook = new Excel.Workbook();
                workbook.xlsx.readFile(documentName)
                    .then(function () {
                        try {
                            const worksheet = workbook.getWorksheet('Cursos')
                            SeccionalHandler.find({}, (err, seccionales) => {
                                seccionales.forEach(seccional => {
                                    if (seccional.nombre) {
                                        //worksheet.getRow(1).getCell(columnaCarrier).value = 
                                        //dobCol.values = [,'X','X']
                                        RolHandler.find({ direccion: seccional.nombre }, (err, subObt) => {
                                            if (err) return res.status(500).send({ estado: 'Error', message: 'Error en la petición', data: Object.assign({ "error": err }) });
                                            if (!subObt) return res.status(200).send({ estado: 'Error', message: 'No fue posible registrar los roles', data: Object.assign({}) });
                                            var dobCol = worksheet.getColumn(columnaCarrier);
                                            dobCol.header = seccional.nombre;
                                            console.log('Valor', seccional.nombre)
                                            console.log('Valor Columna', seccional.nombre)
    
                                            dobCol.key = seccional.nombre;
                                            subObt.forEach(subGrupo => {
                                                matrizCursosSeccional.push([2, columnaCarrier])
                                                subGrupo.cursos.forEach(curso => {
                                                    //  console.log(parseInt(curso.idCurso) + 1,columnaCarrier)
                                                    worksheet.getRow(parseInt(curso.idCurso) + 1).getCell(columnaCarrier).value = "X"
                                                    //console.log('Row ' + (parseInt(curso.idCurso) + 1) + ' = ' + JSON.stringify(worksheet.getRow(parseInt(curso.idCurso) + 1).values));
                                                    //   console.log('Valor',worksheet.getRow(parseInt(curso.idCurso) + 1).getCell(columnaCarrier).value)
                                                    // console.log('Valor', curso)

                                                    /* var dobCol = worksheet.getColumn(columnaCarrier);
                                                     dobCol.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
                                                         if ((parseInt(curso.idCurso) + 1) == rowNumber) {
                                                             cell.value = "X"
                                                         }
                                                     });*/
                                                });
                                            });
                                            console.log(seccionales.length+2,columnaCarrier)
                                            if(columnaCarrier==(seccionales.length+2)){
                                                workbook.xlsx
                                                .writeFile(documentName)
                                                .then(() => {
                                                    base64.encode(documentName, function (err, base64String) {
                                                        var respuesta = { documento: base64String }
                                                        return res.status(200).send({
                                                            estado: 'Registrados',
                                                            message: util.format("Archivo procesado exitosamente"),
                                                            data: Object.assign({})
                                                        });
                                                    });
                                                })
                                                .catch((err) => {
                                                    return res.status(200).send({
                                                        estado: 'Error',
                                                        message: util.format("Error al almacenar el archivo"),
                                                        data: Object.assign({ "error": err })
                                                    });
                                                });
                                            }else{
                                                columnaCarrier++;
                                            }
                                            
                                        });
                                    }
                                });
                            });
                        }
                        catch (err) {
                            console.error(err)
                            return res.status(200).send({
                                estado: 'Preguntas NO registradas',
                                message: util.format("Formato del documento no es valido " + err),
                                data: Object.assign({})
                            });
                        }

                    });
            } catch (err) {
                console.error(err)
                return res.status(200).send({
                    estado: 'Preguntas NO registradas',
                    message: util.format("Formato del documento no es valido " + err),
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



