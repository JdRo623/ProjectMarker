'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
var tools = require('../utils/tools.js');
const cuestionario = require('../../models/Cuestionario.model')
const usuario = require('../../models/user_j.model')
const subgrupo = require('../../models/subdireccion.model')
const coordinacion = require('../../models/coordinacion.model')
const curso = require('../../models/curso.model')

module.exports = {
    Cuestionario:Cuestionario,
    completadas:completadas,
    actualizarCompetencia:actualizarCompetencia,
    actualizarPregunta:actualizarPregunta,
    actualizarEstadoCuestionario:actualizarEstadoCuestionario
}

function actualizarEstadoCuestionario(req,res){
    try {
        var actualizando = async(req,res)=>{
            var dec = tools.decryptJson(req.body.data);            
            var respondido = true;    
                cuestionario.findOne({email: dec.data.email},(err,cuestionarioBuscado)=>{
                    if(err){
                        console.log(err)
                    }
                    if(!cuestionarioBuscado){
                        return res.status(601).send({
                            estado: 'No existe el cuestionario',
                            message: util.format('no existe el cuestionario')
                        });
                    }
                    
                    if(respondido){
                        cuestionarioBuscado.listado_competencias.forEach(element => {                    
                            if(element.estado_respuesta != 'Respondida'){                            
                                respondido = false;
                                break;
                            }
                        });
                    }
                    if(respondido){
                        cuestionarioBuscado.listado_preguntas.forEach(element => {                    
                            if(element.estado_respuesta != 'Respondida'){                            
                                respondido = false;
                                break;
                            }
                        });
                    }
                    if(respondido){
                        cuestionarioBuscado.listado_preguntas_seccion_iii.forEach(element => {                    
                            if(element.estado_respuesta != 'Respondida'){                            
                                respondido = false;
                                break;
                            }
                        });
                    }
                    
                    if(respondido){
                        cuestionarioBuscado.estado_cuestionario = 'Respondido';
                        cuestionario.updateOne({email: dec.data.email}, cuestionarioBuscado).then(()=>{
                            return res.status(200).send({
                                estado: 'Exito',
                                message: util.format('cuestionario actualizado'),
                                data: Object.assign(cuestionarioBuscado)
                            });
        
                        })
                    }else{
                        return res.status(200).send({
                            estado: 'no se actualizo cuestionario',
                            message: util.format('no se han respondido todos los campos'),
                            data: Object.assign(cuestionarioBuscado)
                        });
                    }                                       
    
                })
         }
         actualizando(req,res);
    } catch (error) {
        throw boom.boomify(err)
    }
}

function actualizarPregunta(req,res){
 try {
     var actualizando = async(req,res)=>{
        var dec = tools.decryptJson(req.body.data);            
            
            cuestionario.findOne({email: dec.data.email},(err,cuestionarioBuscado)=>{
                if(err){
                    console.log(err)
                }
                if(!cuestionarioBuscado){
                    return res.status(601).send({
                        estado: 'No existe el cuestionario',
                        message: util.format('no existe el cuestionario')
                    });
                }
                
                cuestionarioBuscado.listado_preguntas.forEach(element => {                    
                    if(element.id_pregunta == dec.data.id_pregunta){
                        
                        element.valor_respuesta = dec.data.valor_respuesta;
                        element.estado_respuesta =  dec.data.estado_respuesta;                        
                    }
                }); 
                cuestionario.updateOne({email: dec.data.email}, cuestionarioBuscado).then(()=>{
                    return res.status(200).send({
                        estado: 'Exito',
                        message: util.format('cuestionario actualizado'),
                        data: Object.assign(cuestionarioBuscado)
                    });

                })                   

            })
     }
     actualizando(req,res);
 } catch (error) {
    throw boom.boomify(err)
 }
}


function actualizarCompetencia(req,res){
    try {
        var actualizando = async(req,res)=>{
            var dec = tools.decryptJson(req.body.data);            
            
            cuestionario.findOne({email: dec.data.email},(err,cuestionarioBuscado)=>{
                if(err){
                    console.log(err)
                }
                if(!cuestionarioBuscado){
                    return res.status(601).send({
                        estado: 'No existe el cuestionario',
                        message: util.format('no existe el cuestionario')
                    });
                }
                
                cuestionarioBuscado.listado_competencias.forEach(element => {
                    if(element.nombreCompetencia == dec.data.competencia){
                        element.valor_respuesta = dec.data.valor_respuesta;
                        element.estado_respuesta =  dec.data.estado_respuesta;                        
                    }
                }); 
                cuestionario.updateOne({email: dec.data.email}, cuestionarioBuscado).then(()=>{
                    return res.status(200).send({
                        estado: 'Exito',
                        message: util.format('cuestionario actualizado'),
                        data: Object.assign(cuestionarioBuscado)
                    });

                })                   

            })
            
        }
        actualizando(req,res);
    } catch (error) {
        throw boom.boomify(err)
    }
}

function completadas(req,res){    
    try {
        var traer = async(req,res)=>{
            var respondidas = 0;
            var noRespondidas = 0;
            cuestionario.find((err,cuestionarios)=>{
                if(err){
                    console.log(err);
                }
                if(!cuestionarios){
                    return res.status(200).send({
                        estado: 'No Hay Cuestionarios',
                        message: util.format(err)
                    });
                }
                                
                cuestionarios.forEach(element => {
                    console.log(element);
                    if(element.estado_cuestionario == 'Pendiente'){
                        noRespondidas++;
                    }else{
                        respondidas++;
                    }
                });
                var encuestasRespondidas = {
                    resueltas: respondidas,
                    norespondidas: noRespondidas
                }
                return res.status(200).send({
                    estado: 'Exito',
                    message: util.format('contestadas'),
                    data: Object.assign(encuestasRespondidas)
                });

            })
        }
        traer(req,res);
    } catch (error) {
        throw boom.boomify(err)
    }
}
function Cuestionario(req,res){
    try {
        var newCuestionario;
        var agregar = async(req,res)=>{
            var cues = req.body.data;
            console.log(cues);
            await cuestionario.findOne({id_colaborador:cues.email},(err,cuestionario)=>{
                if(err){
                    console.log(err);
                    return res.status(601).send({
                        estado: 'error',
                        message: util.format(err)
                    }); 
                }
                if(!cuestionario){
                    
                    usuario.findOne({email: cues.email},(err,usuario)=>{
                        if(err){
                            return res.status(601).send({
                                estado: 'error',
                                message: util.format(err)
                            });
                        }
                        if(!usuario){
                            return res.status(200).send({
                                estado: 'Usuariono existe',
                                message: util.format('Usuariono existe')
                            });
                        }
                        console.log('llego')
                        newCuestionario = {
                            id_Cuestionario: usuario.identificacion,
                            id_colaborador: cues.email,                    
                            coordinacion: cues.coordinacion,
                            rol: cues.rol,
                            subgrupo: cues.subgrupo,
                            seccional: cues.seccional,
                            Listado_Competencias: traerCompetencias(cues.seccional),
                            Litado_preguntas:traerPreguntas(cues.seccional),
                            listado_preguntas_seccion_iii: traerPreguntas3(cues.seccional),
                            estado_cuestionario: cues.estado 
                        }                
                        
                    })
                    console.log(newCuestionario);
                    return res.status(200).send({
                        estado: 'Exito',
                        message: util.format('newCuestionario'),
                        //data: Object.assign(newCuestionario)
                    });                
                }

                return res.status(200).send({
                    estado: 'Ya existe el cuestionario',
                    message: util.format('Ya existe el cuestionario'),
                    //data: Object.assign(cuestionario)
                });

            })
        }
        agregar(req,res);        
    } catch (error) {
        throw boom.boomify(err)
    }
}

function traerCompetencias(seccional){
    console.log(seccional);
    var competencias = [];
    var encontrado = false;
    var cursos = [];
    subgrupo.findOne({seccional:seccional},(err,subgrupos)=>{
        if(err){
            console.log(err);
        }
        console.log(subgrupos)
        if(subgrupos.length != 0){
            subgrupos.array.forEach(element => {            
                cursos.push(element.idCurso);
            });
        }        
    });
    coordinacion.findOne({seccional:seccional},(err,coordinacion)=>{
        if(err){
            console.log(err);
        }
        console.log(coordinacion)
        if(coordinacion.length != 0){
            coordinacion.array.forEach(element => {
                cursos.push(element.idCurso);
            });
        }        
    });

    if (cursos.length == 0){
        return [];
    }else{
        cursos.array.forEach(element => {
            
            curso.findOne({consecutivo:element}, (err,cursobuscado)=>{
                if(err){
                    console.log(err);
                }
                competencias.array.forEach(compe => {
                    if(cursobuscado === compe){
                        encontrado = true;                   
                    }
                });
    
                if(!encontrado){                
                    competencias.push({nombre_competencia:cursobuscado.competencia});
                }else{
                    encontrado = false;
                }
            })
        });
        return competencias;
    }    
}

function traerPreguntas(seccional){
    var cursos = [];
    var encontrado = false;
    subgrupo.findOne({seccional:seccional},(err,subgrupos)=>{
        if(err){
            console.log(err);
        }
        subgrupos.cursos.array.forEach(element => {
            cursos.array.forEach(cur => {
                if(element.idCurso === cur.idCurso){
                    encontrado = true;
                }
            });

            if(!encontrado){                
                cursos.push({id_pregunta:element.idCurso});
            }else{
                encontrado = false;
            }
        });
    })
    coordinacion.findOne({seccional:seccional},(err,coordinacion)=>{
        if(err){
            console.log(err);
        }
        coordinacion.cursos.array.forEach(element => {
            cursos.array.forEach(cur => {
                if(element.idCurso === cur.idCurso){
                    encontrado = true;
                }
            });

            if(!encontrado){                
                cursos.push({id_pregunta:element.idCurso});
            }else{
                encontrado = false;
            }
        });
    })
    return cursos;
}

function traerPreguntas3(seccional){
    return [];
}