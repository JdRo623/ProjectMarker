const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pregunta_seccion_i = Schema({
    consecutivo: String,
    competencia: String,
    cargo: String,
    proceso: String,
    subproceso: String,
    eje_tematico: String,
    tematica: String,
    respuestas: [{
        cod_respuesta: String,
        descriptor : String
    }],  
    cod_respuesta_correcta: String,
    valor_pregunta: String,
    aleatorio: String
    }
)

module.exports = mongoose.model('preguntas_seccion_i', pregunta_seccion_i);