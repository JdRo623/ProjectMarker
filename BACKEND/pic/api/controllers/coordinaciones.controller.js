'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
var tools = require('../utils/tools.js');
const coordinacion = require('../../models/coordinacion.model')

module.exports = {
    coordinacionSecional:coordinacionSecional
}

function coordinacionSecional(req,res){
    console.log(req.body.data);
    try {
        var obtener = async(req,res)=>{    
            const reqDecrypt = (tools.decryptJson(req.body.data))
            const filtro = {
                seccional: reqDecrypt.seccional
            }
            await coordinacion.find(filtro, (err, coordinaciones)=>{
                if(err){
                    return res.status(601).send({
                        estado: 'error',
                        message: util.format(err)
                    });                    
                }
                if(!coordinaciones){
                    return res.status(200).send({
                        estado: 'No hay coordinaciones',
                        message: util.format('No Hay coordinaciones')                       
                    }); 
                }
                return res.status(200).send({
                    estado: 'Exito',
                    message: util.format('Coordinaciones obtenidas con Exito'),
                    data: Object.assign(coordinaciones)
                });
            })
        }
        obtener(req,res);
    } catch (error) {
        throw boom.boomify(err)
    }
}