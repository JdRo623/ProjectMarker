
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ruta = Schema({
    id_ruta: {
        type: String,
        unique: true
    },
    identificacion: String,
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
                    proceso: String,
                    colorEstado: String,
                    estado: {
                        type: String,
                        default: 'Por Cursar' //Por Cursar , Cursando, Cursado, Reprobado
                    }
                }
            ],
            listado_cursos_medios: [
                {
                    idCurso: String,
                    nombreCurso: String,
                    proceso: String,
                    colorEstado: String,
                    estado: {
                        type: String,
                        default: 'Por Cursar' //Por Cursar , Cursando, Cursado, Reprobado
                    }
                }
            ],
            listado_cursos_altos: [
                {
                    idCurso: String,
                    nombreCurso: String,
                    proceso: String,
                    colorEstado: String,
                    estado: {
                        type: String,
                        default: 'Por Cursar' //Por Cursar , Cursando, Cursado, Reprobado
                    }
                }
            ],
            listado_cursos_superiores: [
                {
                    idCurso: String,
                    nombreCurso: String,
                    proceso: String,
                    colorEstado: String,
                    estado: {
                        type: String,
                        default: 'Por Cursar' //Por Cursar , Cursando, Cursado, Reprobado
                    }
                }
            ],
            
        }
    ],
    estado_ruta: {
        type: String,
        default: 'Por Aprobar' //Por Cursar , Cursando, Cursado, Reprobado
    }
}
)

module.exports = mongoose.model('rutas_aprendizaje', ruta);