'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const ruta = require('../../models/ruta_aprendizaje.model');
const curso = require('../../models/curso.model');
var tools = require('../utils/tools.js');

module.exports = {
    estadisticaCurso:estadisticaCurso

};

function estadisticaCurso(req,res){
    try {
        var cursos = async(req,res)=>{
            ruta.find((err,rutas)=>{
                if(err){
                    return res.status(603).send({
                        estado: 'error',
                        message: util.format(err),
                        data: Object.assign({})
                    });
                }
                if(!rutas){
                    return res.status(200).send({
                        estado: 'No hay rutas',
                        message: util.format('No hay rutas'),
                        data: Object.assign({})
                    });
                }
                curso.find((err,cursosListado)=>{
                    listaEstadisticaCursos =[];
                    cursando = 0;
                    porCursar = 0;
                    if(err){
                        return res.status(603).send({
                            estado: 'error',
                            message: util.format(err),
                            data: Object.assign({})
                        });
                    }
                    if(!cursosListado){
                        return res.status(200).send({
                            estado: 'No hay cursos',
                            message: util.format('No hay cursos'),
                            data: Object.assign({})
                        });
                    }
                    cursosListado.forEach(element =>{
                        rutas.forEach(rutaActual=>{
                            rutaActual.listado_competencias.forEach(competenciaActual=>{
                                competenciaActual.listado_cursos.forEach(cursoActual=>{
                                    if(element.consecutivo == cursoActual.numero_curso){
                                        if(cursoActual.estado_curso == 'Cursando' || cursoActual.estado_curso == 'Por Cursar'){
                                            if(cursoActual.estado_curso == 'Cursando'){
                                                cursando++;
                                            }else if(cursoActual.estado_curso == 'Por Cursar'){
                                                porCursar++;
                                            }
                                        }
                                    }
                                })
                            })
                        })
                        var estadisticaCursos={
                            numero_curso: element.consecutivo,
                            cursando_curso: cursando,
                            pendiente_curso: porCursar
                        }
                        listaEstadisticaCursos.push(estadisticaCursos);
                        cursando = 0;
                        porCursar = 0;
                    });
                    return res.status(200).send({
                        estado: 'Listado cursos con cursando y por cursas',
                        message: util.format('Listado cursos con cursando y por cursas'),
                        data: Object.assign(listaEstadisticaCursos)
                    });
                })
            })
        }
        cursos(req,res);
    } catch (error) {
        throw boom.boomify(error);
    }
}