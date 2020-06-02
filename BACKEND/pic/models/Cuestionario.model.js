const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cuestionario = Schema({
    id_Cuestionario: String,
    id_colaborador:String,
    Listado_Competencias:[
        {
            nombre_competencia:String,
            estado_respuesta: String
        }        
    ],
    Litado_preguntas:[
        {
            id_pregunta: String,
            estado_respuesta: String
        }
    ],
    listado_preguntas_seccion_iii:[
        {
            id_pregunta: String,
            estado_preguntas: String,
        }
    ],
    estado_cuestionario:String
}
)

module.exports = mongoose.model('cuestionario', cuestionario);