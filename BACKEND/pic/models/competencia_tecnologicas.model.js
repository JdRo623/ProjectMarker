const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competencia_tecnologica = Schema({
    consecutivo: String,
    nombre_competencia: String,
    descripcion: String,
    dependencia: String,
    descriptores: [String], //Subproceso
    proceso: String,
    descripcion: String,
    tareas_nivel_1: [{
        definicion: String,
        descriptores : [String]
    }],
    tareas_nivel_2: [{
        definicion: String,
        descriptores : [String]
    }],    
    tareas_nivel_3: [{
        definicion: String,
        descriptores : [String]
    }],
    tareas_nivel_4: [{
        definicion: String,
        descriptores : [String]
    }],
    numero_contacto: String
    }
)

module.exports = mongoose.model('competencia_tecnologicas', competencia_tecnologica);