'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
var tools = require('../utils/tools.js');
const cargo = require('../../models/cargos.model')

module.exports = {
    darCargos:darCargos
}

function darCargos(req,res){
    try {
        var obtener = async(req,res)=>{
            await cargo.find((err, cargos)=>{
                if(err){
                    return res.status(601).send({
                        estado: 'error',
                        message: util.format(err),
                        data: Object.assign({})
                    });                    
                }
                if(!cargos){
                    return res.status(200).send({
                        estado: 'No Hay Cargos',
                        message: util.format('No Hay Cargos'),
                        data: Object.assign({})
                    }); 
                }
                cargos.sort(function(a, b){
                    if(a.nombre < b.nombre) { return -1; }
                    if(a.nombre > b.nombre) { return 1; }
                    return 0;
                })

                return res.status(200).send({
                    estado: 'Exito',
                    message: util.format('Cargos obtenidos con Exito'),
                    data: Object.assign(cargos)
                });
            })
        }
        obtener(req,res);
    } catch (error) {
        throw boom.boomify(err)
    }
}