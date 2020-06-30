const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cuestionario = Schema({
    id_Cuestionario:{
        type:String,
        unique:true
    },
    id_colaborador: String,
    coordinacion: String,
    email: String,
    rol: String,
    subgrupo: String,
    seccional: String,
    listado_cursos:[
        {
            idCurso: String,
            nombreCurso: String,
            estado_curso:{
                type:String,
                default:'pendiente'
            }
        }
    ],
    listado_competencias: [
        {
            nombreCompetencia: String,
            descripcionCompetencia:String,
            valor_respuesta:String,
            estado_respuesta: {
                type:String,
                default:'No respondida'
            } 
        }
    ],
    listado_preguntas: [
        {
            id_pregunta: String,
            valor_respuesta: String,
            estado_respuesta:{
                type:String,
                default:'No respondida'
            } 
        }
    ],
    listado_preguntas_seccion_iii: [
        {
            id_pregunta: String,
            valor_respuesta: String,
            estado_preguntas: {
                type:String,
                default:'No respondida'
            } ,
        }
    ],
    estado_cuestionario: {
        type:String,
        default: 'Pendiente'
    }
}
)

module.exports = mongoose.model('cuestionario', cuestionario);