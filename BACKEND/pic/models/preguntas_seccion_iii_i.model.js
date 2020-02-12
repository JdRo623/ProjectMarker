const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preguntas_seccion_iii = Schema({
    consecutivo: String,
    competencia: String,
    cargo: String,
    proceso: String,
    subproceso: String,
    subcompetencia: String,
    enunciado: String,
    respuestas: [{
        cod_respuesta: String,
        descriptor : String
    }],  
    cod_respuesta_correcta: String,
    valor_pregunta: String,
    eje_tematico: String,
    tematica: String,
    aleatorio: String
    }
)

module.exports = mongoose.model('preguntas_seccion_iii_i', preguntas_seccion_iii);