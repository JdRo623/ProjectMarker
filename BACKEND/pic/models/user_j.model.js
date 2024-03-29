const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_j = Schema({
    nombres: String,
    apellidos: String,
    nombres_jefe: String,
    apellidos_jefe: String,
    Fecha_Inicio: String,
    email: String,
    identificacion: String,
    ciudad: String,
    cargo: String,
    descripccion_cargo: String,
    nivel1: String,
    nivel2: String,
    fecha_registro: String,
    nivel3: {
        type: String,
        require: false
    },
    nivel4: {
        type: String,
        require: false
    },
    estado_encuesta:{
        type: String,
        default: "No completado"
    },
    contrasena_maestra: {
        type: String,
        require: ''
    },
    password:{
        type: String,
        default: this.identificacion,
    }

})
module.exports = mongoose.model('User_j', user_j);