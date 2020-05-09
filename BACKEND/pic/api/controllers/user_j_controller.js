'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const user_jModel = require('../../models/user_j.model');
var tools = require('../utils/tools.js');
var Excel = require('exceljs');

module.exports = {
    CargarEmpleado: CargarEmpleado,
    buscarEmpleado: buscarEmpleado,
}

function CargarEmpleado(req, res){
    try {
        var carga = async(req,res) => {            
            try {
                var obtener = tools.decrypt(req.body.data) 
                console.log(obtener)               
                var data = obtener.archivo;                
                data = data.replace(/^data:image\/png;base64,/, "");
                let buff = new Buffer(data, 'base64');    
                var workbook = new Excel.Workbook();
                workbook.xlsx.load(buff).then(function (){
                    try {
                        var rowCount = 2;                        
                        var users =[];                      
                                                                  
                        workbook.eachSheet(function(worksheet, sheetId){
                            
                            if(sheetId == 1){  
                                console.log("dentro dentro");
                                let aux = true;                              
                                while(rowCount <= 5){ 
                                    var user_j = {
                                        nombres : String,
                                        apellidos : String,
                                        nombres_jefe : String,
                                        apellidos_jefe : String,
                                        Fecha_Inicio : String,
                                        email : String,
                                        identificacion : String,
                                        ciudad : String,
                                        cargo : String,
                                        descripccion_cargo : String,
                                        nivel1 : String,
                                        nivel2 : String,
                                        nivel3 : String,
                                        nivel4 : String
                                    }; 

                                    var row = worksheet.getRow(rowCount);            
                                    user_j.nombres = tools.encrypt(row.getCell(10).value+"");
                                    user_j.apellidos = tools.encrypt(row.getCell(11).value+"");                                    
                                    user_j.nombres_jefe = tools.encrypt(row.getCell(15).value+"");
                                    user_j.apellidos_jefe = tools.encrypt(row.getCell(16).value+"");
                                    user_j.Fecha_Inicio = tools.encrypt(row.getCell(13).value+"");
                                    user_j.email = row.getCell(9).value+"";
                                    user_j.identificacion = tools.encrypt(row.getCell(8).value+"");
                                    user_j.ciudad = row.getCell(7).value+"";
                                    user_j.cargo = tools.encrypt(row.getCell(1).value+"");
                                    user_j.descripccion_cargo = tools.encrypt(row.getCell(6).value+"");
                                    user_j.nivel1 = tools.encrypt(row.getCell(2).value+"");
                                    user_j.nivel2 = tools.encrypt(row.getCell(3).value+"");
                                    user_j.nivel3 = tools.encrypt(row.getCell(4).value+"");
                                    user_j.nivel4 = tools.encrypt(row.getCell(5).value+"");                                    
                                    users.push(user_j);
                                    rowCount++;
                                }
                                var old = JSON.stringify(users).replace(/null/g, 'N/A'); //convert to JSON string
                                var newArray = JSON.parse(old);
                                user_jModel.insertMany(newArray, (error, usuarios) => {
                                    if(error){
                                        console.log(error);
                                        return res.status(603).json(error)
                                    }
                                    if(!usuarios){
                                        console.log(error);
                                        return res.status(604).json(error)
                                    }

                                    return res.status(200).json("se han cargado los usuarios")                
                                })
                            }
                        })
                        
                    } catch (error) {
                        console.log(error);
                        return res.status(601).send({
                            estado: 'Empleados vacio',
                            message: util.format("no hay registros"),
                            data: Object.assign({})
                        });
                    }
                })
            } catch (error) {
                console.log(error);
                return res.status(602).send({
                    estado: 'demoro',
                    message: util.format("Error procesando el archivo"),
                    data: Object.assign({})
                });
            }
        }
        carga(req, res);
    } catch (error) {
        throw boom.boomify(error)
    }    
}

function buscarEmpleado(req,res){
    try {
        var traer = async(req,res) => {
            var dec = tools.decrypt(req.body.data);
            const filtro = {
                email : dec.email
            }            
            await user_jModel.findOne(filtro, (err, user) => {
                if(err){
                    console.log(err);
                }
                if(!user){
                    return res.status(200).send({
                        estado: 'Error',
                        message: 'No existe el empleado', 
                        //data: Object.assign(user) 
                    });
                } else {     
                    console.log(user);              
                    var user_decript = {};
                    user_decript.nombres = tools.decrypt(user.nombres);
                    user_decript.apellidos = tools.decrypt(user.apellidos);
                    user_decript.nombres_jefe = tools.decrypt(user.nombres_jefe);
                    user_decript.apellidos_jefe = tools.decrypt(user.apellidos_jefe);
                    user_decript.Fecha_Inicio = tools.decrypt(user.Fecha_Inicio);
                    user_decript.email = user.email;
                    user_decript.identificacion = tools.decrypt(user.identificacion);
                    user_decript.ciudad = user.ciudad;
                    user_decript.cargo = tools.decrypt(user.cargo);
                    user_decript.descripccion_cargo = tools.decrypt(user.descripccion_cargo);
                    user_decript.nivel1 = tools.decrypt(user.nivel1);
                    user_decript.nivel2 = tools.decrypt(user.nivel2);
                    user_decript.nivel3 = tools.decrypt(user.nivel3);
                    user_decript.nivel4 = tools.decrypt(user.nivel4);
                    

                    return res.status(200).send({
                        estado: 'Empleado Encontrado',
                        message: util.format('Información Obtenida'),
                        data: Object.assign(user_decript)
                    });
                }                    
            })
        }
        traer(req,res);
    } catch (error) {
        console.log(error);
    }
}

