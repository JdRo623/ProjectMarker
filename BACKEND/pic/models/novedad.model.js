const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const novedad = Schema({
    fecha_novedad: String,
    tipo_novedad: String,
    descripcion_novedad: String,
    usuario: String
    }
)

module.exports = mongoose.model('novedades', novedad);