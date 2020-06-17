const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cargo = Schema({
    nombre: String,
    fecha_registro: String
})
module.exports = mongoose.model('Cargos', cargo);