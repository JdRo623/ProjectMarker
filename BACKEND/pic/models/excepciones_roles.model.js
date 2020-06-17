const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const excepcion = Schema({
    nombre: String,
    fecha_registro: String,
    cursos: [
        {
            idCurso: String,
            cargos: [
                String
    
            ]
        }
    ],

})
module.exports = mongoose.model('Excepciones', excepcion);