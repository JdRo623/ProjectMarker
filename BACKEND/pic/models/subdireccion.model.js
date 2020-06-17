const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subgrupo = Schema({
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
    seccional: String
})
module.exports = mongoose.model('SubGrupos', subgrupo);