'use strict';
const jwt = require('jsonwebtoken');
var util = require('util');
const boom = require('boom')
const config = require('../../config.json');
var user = require('../../models/user_j.model');
const tools = require('../utils/tools');

module.exports = {
    logIn : logIn
}

function logIn(req,res){
    var dec = tools.decryptJson(req.body.data);
    const filtro = {
        email : dec.email,       
    }
    user.findOne(filtro, (err, user) =>{
        if(err){
            console.log(err);
        }
        if(!user){
            return res.status(640).send({
                estado: 'Error',
                message: 'No existe el usuario', 
                //data: Object.assign(user) 
            });
        }
        if(tools.decrypt(user.password) == dec.password){
            const token = jwt.sign({user}, 'my-secret', {expiresIn: 5400});
            return res.status(200).send({
                estado: 'usuario encontrado',
                message: 'token del usuario', 
                data: Object.assign(token) 
            });
        }else{
            return res.status(200).send({
                estado: 'Contraseña invalida',
                message: 'Contraseña invalida'                 
            });
        }
        

    });
}

function verify(req, res, next) {
    jwt.verify(req.token, 'my-secret', (err, data)=>{
        if(err){
            return res.status(601).send({
                estado: 'error',
                message: 'error token invalido', 
                //data: Object.assign(token) 
            }); 
        }else{
            next();
        }
    })
}