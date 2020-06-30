
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
            categorizada: String,
            listado_cursos_basicos: [
                {
                    idCurso: String,
                    nombreCurso: String,
                    colorEstado: String,
                    estado: {
                        type: String,
                        default: 'Por Cursar' //Por Cursar , Cursando, Cursado
                    }
                }
            ],
            listado_cursos_medios: [
                {
                    idCurso: String,
                    nombreCurso: String,
                    colorEstado: String,
                    estado: {
                        type: String,
                        default: 'Por Cursar' //Por Cursar , Cursando, Cursado
                    }
                }
            ],
            listado_cursos_altos: [
                {
                    idCurso: String,
                    nombreCurso: String,
                    colorEstado: String,
                    estado: {
                        type: String,
                        default: 'Por Cursar' //Por Cursar , Cursando, Cursado
                    }
                }
            ],
            listado_cursos_superiores: [
                {
                    idCurso: String,
                    nombreCurso: String,
                    colorEstado: String,
                    estado: {
                        type: String,
                        default: 'Por Cursar' //Por Cursar , Cursando, Cursado
                    }
                }
            ],
            
        }
    ],
    estado_ruta: {
        type: String,
        default: 'Por Aprobar' //Por Cursar , Cursando, Cursado
    }
}
)

module.exports = mongoose.model('rutas_aprendizaje', ruta);