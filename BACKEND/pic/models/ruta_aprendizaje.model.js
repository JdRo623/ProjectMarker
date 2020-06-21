
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ruta = Schema({
    id_ruta: {
        type: String,
        unique: true
    },

    email: String,
    listado_competencias: [
        {
            nombreCompetencia: String,
            valor_respuesta: String,
            listado_cursos: [
                {
                    numero_curso: String,
                    estado_curso: {
                        type: String,
                        default: 'Por Cursar' //Por Cursar , Cursando, Cursado
                    }
                }
            ]
            
        }
    ],
    estado_ruta: {
        type: String,
        default: 'Por Aprobar' //Por Cursar , Cursando, Cursado
    }
}
)

module.exports = mongoose.model('rutas_aprendizaje', ruta);