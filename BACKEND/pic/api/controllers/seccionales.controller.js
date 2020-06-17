'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
var tools = require('../utils/tools.js');
const seccionales = require('../../models/seccionales.model')

module.exports = {
    darSeccionales:darSeccionales
}

function darSeccionales(req,res){
    try {
        var obtener = async(req,res)=>{
            await seccionales.find((err, seccionales)=>{
                if(err){
                    return res.status(601).send({
                        estado: 'error',
                        message: util.format(err),
                        data: Object.assign({})
                    });                    
                }
                if(!seccionales){
                    return res.status(200).send({
                        estado: 'Error',
                        message: util.format('No se encontraron seccionales'),
                        data: Object.assign({})
                    }); 
                }
                return res.status(200).send({
                    estado: 'Exito',
                    message: util.format('Seccionales obtenidas con Exito'),
                    data: Object.assign(seccionales)
                });
            })
        }
        obtener(req,res);
    } catch (error) {
        throw boom.boomify(err)
    }
}