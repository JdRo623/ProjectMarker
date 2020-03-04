const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actividad = Schema({
    consecutivo: String,
    eje_tematico: String,
    proceso: String,
    competencia: String,
    roles: String,
    tema_central: String,
    nombre_actividad: String,
    modalidad: String,
    tipo_oferta: String,
    cantidad_participantes: String,
    relacion_programas_anteriores:String,
    cantidad_participantes_sugerida:String,
    cantidad_participantes_total:String,
    nivel_ruta: String,
    intencidad_horaria: String,
    objetivo_actividad: String,
    resumen_contenido: String,
    bibliografia: String,
    perfil_conferencista: String,
    pre_requisitos: String,
    fecha_ejecucion: String,
    fecha_registro: String,    
}
)

module.exports = mongoose.model('actividades', actividad);