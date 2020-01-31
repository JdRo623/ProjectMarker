'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const EmpleadosModel = require('../../models/empleado.model');
var tools = require('../utils/tools.js');

module.exports = {
    registrarEmpleados: registrarEmpleados,

};

function registrarEmpleados(req, res) {  
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
                                    var worksheet = workbook.getWorksheet('KactuS - KNmContr');
                                    var rowCount = 2;
                                    var empleadosDefinitivos =[];
                                    if(worksheet){
                                            do{
                                                var empleado ={
                                                    fecha_registro: fecha                                                };
                                                var row = worksheet.getRow(rowCount);
                                               
                                                
                                                var numValues = row.actualCellCount;
                                                if(numValues==0) break;   
                                                empleado.identificacion = tools.encrypt(row.getCell(1).value+"")
                                                empleado.nombres= tools.encrypt(row.getCell(2).value+"")
                                                empleado.apellidos= tools.encrypt(row.getCell(3).value+"")
                                                empleado.cargo= tools.encrypt(row.getCell(4).value+"")
                                                empleado.direccion_seccional= tools.encrypt(row.getCell(5).value+"")
                                                empleado.subdireccion =  tools.encrypt(row.getCell(6).value+"")
                                                empleado.coordinacion=  tools.encrypt(row.getCell(7).value+"")
                                                empleadosDefinitivos.push(empleado);  
                              
                                                rowCount++;
                                               }while(rowCount<=11000)

                                            var old = JSON.stringify(empleadosDefinitivos).replace(/null/g, 'N/A'); //convert to JSON string
                                            var newArray = JSON.parse(old);
                                            EmpleadosModel.insertMany(newArray,(err, empleados) => {
                                                if(err)return res.status(500).send({ estado: 'Error',message: 'Error en la petición', data: Object.assign ({"error": err})});
                                                if(!empleados) return res.status(200).send({ estado: 'Error',message: 'No fue posible registrar los miembros', data: Object.assign ({})});
                                                return res.status(200).send({
                                                    estado: 'Empleados registrados',
                                                    message: util.format("Archivo procesado exitosamente"),
                                                    data: Object.assign({})
                                                    }); 
                                                
                                            });   
                                    }else{
                                        console.log('Formato del documento no es valido');
                                        return res.status(200).send({ estado: 'Error',message: 'Formato del documento no es valido', data: Object.assign ({})});                                   // listaMiembrosInvalidos.push(a);
                                    }
                                    
                                }catch (err) {
                                    return res.status(200).send({
                                        estado: 'Empleados NO registrados',
                                        message: util.format("Error procesando el archivo"),
                                        data: Object.assign({})
                                        }); 
                                }
                        });
                }catch (err) {
                    return res.status(200).send({
                        estado: 'Empleados NO registrado',
                        message: util.format("Formato del documento no es valido"),
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