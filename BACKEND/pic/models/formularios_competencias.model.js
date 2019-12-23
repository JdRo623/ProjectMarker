const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulario = Schema({
    consecutivo: String,
    competencia: String,
    fecha_creacion: String,
    preguntas: [{
        consecutivo: String,
        competencia: String,
        tipo: String,
        enunciado: String,
        respuestas: [{
            cod_respuesta: String,
            descriptor : String
        }],  
        cod_respuesta_correcta: String,
        valor_pregunta: String,
        }
    ],  
    }
)

module.exports = mongoose.model('formularios', formulario);