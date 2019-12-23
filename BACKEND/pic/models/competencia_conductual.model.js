const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competencia_conductual = Schema({
    consecutivo: String,
    nombre_competencia: String,
    cargo: String,
    dependencia: String,
    proceso: String,
    nivel_formación: String,
    cargos_afectados: String
    }
)

module.exports = mongoose.model('competencia_conductuales', competencia_conductual);