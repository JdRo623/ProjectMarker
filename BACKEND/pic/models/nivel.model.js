const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nivel = Schema({
  nombre: String,
  fecha_registro: String,
  tipo_nivel:String,
  cargos: [
    {
      nombreCargo: String,
      cursos: [String],
    },
  ],
  predecesor: String,

});
module.exports = mongoose.model("Niveles", nivel);
