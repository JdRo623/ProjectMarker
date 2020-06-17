const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seccional = Schema({
    nombre: String,
    fecha_registro: String
})
module.exports = mongoose.model('Seccionales', seccional);