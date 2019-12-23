const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pregunta = Schema({
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
)

module.exports = mongoose.model('preguntas', pregunta);