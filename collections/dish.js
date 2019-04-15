var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
  name:String,
  recommendations: [{ref:'User',type:Schema.Types.ObjectId}],
  restaurantId: String,
  createdAt:{
    type:Date,
    default:new Date()
  }
});

module.exports = mongoose.model('Dish',dishSchema);
