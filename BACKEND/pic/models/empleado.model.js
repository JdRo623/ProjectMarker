const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleado = Schema({
    identificacion: String,
    nombres: String,
    apellidos: String,
    cargo: String,
    direccion_seccional: String,
    subdireccion: String,
    fecha_registro: String,
    coordinacion: String
    }
)

module.exports = mongoose.model('empleados', empleado);