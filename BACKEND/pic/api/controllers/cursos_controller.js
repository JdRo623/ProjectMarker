'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const ActividadesHandler = require('../../models/actividad.model');
var tools = require('../utils/tools.js');
var Excel = require('exceljs');

module.exports = {
    registrarActividades: registrarActividades,
};

function registrarActividades (req, res) {  
    try{
        var cargar = async(req,res)=>{
            try{
                var reqDecrypt = (tools.decrypt(req.body.data))
                var fecha = tools.getFechaActual()/*.replace(':','');
                fecha = fecha.replace(' ','');*/
                var data = reqDecrypt.archivo;
                console.log(data);
                data = data.replace(/^data:image\/png;base64,/, "");
                let buff = new Buffer(data, 'base64');
                
                var workbook = new Excel.Workbook();
                    workbook.xlsx.load(buff)
                             .then(function() {
                                try{
                                    var rowCount = 10;
                                    var actividades =[];
                                    workbook.eachSheet(function(worksheet, sheetId) {
                                        if(!(sheetId == 1 || sheetId ==2)){
                                            do{
                                                var actividad ={
                                                    fecha_registro: fecha,
                                                    consecutivo: "actividad_"+ tools.generadorConsecutivo(),
                                                };
                                                var row = worksheet.getRow(rowCount);
                                                
                                                var numValues = row.actualCellCount;
                                                if(numValues==0) break;   
                                                actividad.proceso= row.getCell(1).value+""
                                                actividad.competencia= row.getCell(2).value+""
                                                actividad.roles= row.getCell(3).value+""
                                                actividad.eje_tematico = row.getCell(5).value+""
                                                actividad.tema_central= row.getCell(6).value+""
                                                actividad.nombre_actividad= row.getCell(7).value+""
                                                actividad.modalidad = row.getCell(8).value+""
                                                actividad.tipo_oferta= row.getCell(9).value+""
                                                actividad.replacion_programas_anteriores= row.getCell(10).value+""
                                                actividad.cantidad_participantes_sugerida= row.getCell(11).value+"" 
                                                actividad.cantidad_participantes_total= row.getCell(12).value+"" 
                                                actividad.nivel_ruta= row.getCell(13).value+""    
                                                actividad.intencidad_horaria= row.getCell(14).value+""    
                                                actividad.objetivo_actividad= row.getCell(15).value+""
                                                actividad.resumen_contenido= row.getCell(16).value+""
                                                actividad.bibliografia= row.getCell(17).value+""
                                                actividad.perfil_conferencista= row.getCell(18).value+""
                                                actividad.pre_requisitos= row.getCell(19).value+""
                                                actividad.fecha_ejecucion= row.getCell(20).value+""
    
                                                actividades.push(actividad);  
                              
                                                rowCount++;
                                               }while(rowCount<=100)
                                        }

                                    });
                                    var old = JSON.stringify(actividades).replace(/null/g, 'N/A'); //convert to JSON string
                                    var newArray = JSON.parse(old);
                                    ActividadesHandler.insertMany(newArray,(err, actividades) => {
                                                if(err)return res.status(500).send({ estado: 'Error',message: 'Error en la petición', data: Object.assign ({"error": err})});
                                                if(!actividades) return res.status(200).send({ estado: 'Error',message: 'No fue posible registrar los miembros', data: Object.assign ({})});
                                        
                                                return res.status(200).send({
                                                    estado: 'Actividades registradas',
                                                    message: util.format("Archivo procesado exitosamente"),
                                                    data: Object.assign({})
                                                    }); 
                                                
                                            });

                                    
                                }catch (err) {
                                    return res.status(200).send({
                                        estado: 'Actividades NO registradas',
                                        message: util.format("Formato del documento no es valido "+ err),
                                        data: Object.assign({})
                                        }); 
                                }
                        });
                }catch (err) {
                    return res.status(200).send({
                        estado: 'Preguntas NO registradas',
                        message: util.format("Formato del documento no es valido "+err),
                        data: Object.assign({})
                        }); 
                }
            }
            cargar(req,res);
        } catch (err){
            res.json(err);
            throw boom.boomify(err)
        } 
    
}

