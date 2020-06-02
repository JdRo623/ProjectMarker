'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
const Pregunta_w = require('../../models/preguntas_w.model');
var tools = require('../utils/tools.js');

module.exports = {
    agregarPregunta : agregarPregunta,
    obtenerPreguntasNuevas: obtenerPreguntasNuevas,
}

function agregarPregunta(req,res){
    try {
        var agregar = async(req,res) => {
            try {
                var obtener = tools.decryptJson(req.body.data);
                console.log(obtener);
                var pregunta = obtener.pregunta;
                Pregunta_w.insertMany(pregunta, (error, pregunta) => {
                    if(error){
                        console.log(error);
                        return res.status(603).json(error)
                    }
                    if(!pregunta){
                        console.log(error);
                        return res.status(604).json(error)
                    }

                    return res.status(200).json("se a agregado la pregunta") 
                })
                
            } catch (error) {
                console.log(error);
                return res.status(602).send({
                    estado: 'no agrego pregunta',
                    message: util.format("Error agregando pregunta"),
                    data: Object.assign({})
                });
            }
        }
        agregar(req,res);
    } catch (error) {
        throw boom.boomify(error)
    }
}

function obtenerPreguntasNuevas(req,res){
    try {
        var preguntas_wo = [];
        var traer = async(req,res)=>{
            await Pregunta_w.find((error,preguntas)=>{
                if (error){
                    return res.status(603).json(error)
                }
                if(!preguntas){
                    return res.status(603).json(error)
                }
                preguntas_wo = preguntas;
                return res.status(200).send({
                    estado: 'preguntas',
                    message: util.format('listado de preguntas'),
                    data: Object.assign(preguntas_wo)
                });
            })
        }
        traer (req,res)
    } catch (error) {
        throw boom.boomify(error)
    }
}