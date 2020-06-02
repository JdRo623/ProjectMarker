const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actividad = Schema({
    consecutivo: String,
    proceso: String,
    proceso_comun: String,
    competencia: String,
    descripcion_competencia: String,
    eje_funcion_publica: String,
    eje_pilar_dian: String,
    eje_tematico_pic: String,
    tema_central: String,
    nombre_actividad: String,
    modalidad: String,
    tipo_oferta: String,
    relacion_programas_anteriores: String,
    cantidad_participantes_sugerida_total: String,
    cantidad_participantes_sugerida_grupo: String,
    cantidad_participantes: String,
    nivel_ruta: String,
    intencidad_horaria: String,
    objetivo_actividad: String,
    resumen_contenido: String,
    bibliografia: String,
    perfil_conferencista: String,
    pre_requisitos: String,
    fecha_ejecucion: String,
    necesidad_capacitacion: String,
    incidentes_criticos: String
}
)

module.exports = mongoose.model('actividades', actividad);