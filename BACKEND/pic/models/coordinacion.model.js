const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordinacion = Schema({
  nombre: String,
  fecha_registro: String,
  cargos: [
    {
      nombreCargo: String,
      cursos: [String],
    },
  ],
  cursos: [
    {
      idCurso: String,
      cargos: [String],
    },
  ],
  seccional: String,
});
module.exports = mongoose.model("Coordinaciones", coordinacion);
