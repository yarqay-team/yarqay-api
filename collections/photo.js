var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var photoSchema = new Schema({
    name: String,
    metada:Object,
    entityId: String,
    url:String,
    createdAt:{
        type:Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Photo',photoSchema);
