const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pregunta_w = Schema({
    numero_pregunta:{
        type:Number,
        unique: true,
    },
    situacion_problema:String,
    encabezado_pregunta:String,
    respuesta1: String,
    respuesta2: String,
    respuesta3: String,
    competencia: String,    
    nivel: String,
    curso: String,
    codificacion: String,
    clave: String,
    justificacion_respuesta_clave:String,
    justificacion_incorrectas:String,
    bibliografia:String

})

module.exports = mongoose.model('preguntas_w', pregunta_w);