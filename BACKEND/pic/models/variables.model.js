const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variables = Schema({
    nombre: String,
    valor: String,
    valor_2: String,
    }
)

module.exports = mongoose.model('variables', variables);