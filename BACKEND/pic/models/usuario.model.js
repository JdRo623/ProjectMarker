const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuario = Schema({
    cedula: String,
    rol: String,
    correo: String,
    contrasena: String,
    fecha_registro: String,
    nombres: String,
    apellidos: String,
    cargo: String,
    dependencia: String,
    numero_contacto: String,
    estado: String
    }
)

module.exports = mongoose.model('usuarios', usuario);