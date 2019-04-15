var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*

Types: Tipo de restriccion

type: 0 - Maximo 5 fotos
type: 1 - Maximo 10 fotos
type: 2 -
type: 3 -

*/

var constraintsSchema = new Schema({

});

module.exports = mongoose.model('Constraints',constraintsSchema);
