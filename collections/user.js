var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    lastname: String,
    city: String,
    country: String,
    nationality:String,
    dni: String,
    cellphone: String,
    googleId:String,
    facebookId:String,
    phone: String,
    profile:String,
    favorites: [{type:Schema.Types.ObjectId,ref:'Restaurant'}],
    role: [String],
    birthday:Date,
    gender:String,
    socialId : String,
    createdAt:{ type: Date, default: Date.now}
});

module.exports = mongoose.model('User',userSchema);
