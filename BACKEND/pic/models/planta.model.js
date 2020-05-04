const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planta = Schema({
    proceso:{
        type:String
    },
    Competencia:{
        type:String
    },
    descripcion_competencia:{
        type:String
    },
    funcion_publica:{
        type:String
    },
    pilar:{
        type:String
    },
    eje_tematico:{
        type: String
    },
    nombre_actividad:{
        type: String
    },
    modalidad:{
        type:String
    },
    tipo_oferta:{
        type:String
    },
    relacion_programas_anteriores:{
        type:String
    },
    cantidad_participantes_sugerido:{
        type:Number
    },
    cantidad_participantes_grupo_sugerido:{
        type:Number
    },
    nivel_aprendizaje:{
        type:String
    },
    intensidad_horaria_capacitacion:{
        type:Number
    },
    objetivo_capacitacion:{
        type:String
    },
    resumen_contenido:{
        type:String
    },
    bibliografia_basica:{
        type:String
    },
    perfil_conferencistas:{
        type:String
    },
    prerequisitos_capacitacion:{
        type:String
    },
    fecha_tentativa_ejecucion:{
        type:Date
    },
    necesidad_capacitacion:{
        type:String
    },
    incidentes_criticos_capacitacion:{
        type:String
    }
})
module.exports = mongoose.model('plantaj', planta);