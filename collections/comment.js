var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var reactions = new Schema({
  user:{ref:'User',type:Schema.Types.ObjectId},
  type:Number
});


var commentSchema = new Schema({
    text: String,
    feel: String,
    restaurantId:String,
    user:{ref:'User',type:Schema.Types.ObjectId},
    reactions: [reactions],
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment',commentSchema);
