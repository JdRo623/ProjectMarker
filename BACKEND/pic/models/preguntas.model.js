const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pregunta = Schema({
    consecutivo: String,
    competencia: String,
    cargo: String,
    proceso: String,
    subproceso: String,
    tipo: String,
    enunciado: String,
    respuestas: [{
        cod_respuesta: String,
        descriptor : String
    }],  
    cod_respuesta_correcta: String,
    valor_pregunta: String,
    aleatorio: String
    }
)

module.exports = mongoose.model('preguntas', pregunta);