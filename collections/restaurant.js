var mongoose = require('mongoose');
var random = require('mongoose-random');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var restaurantSchema = new Schema({
    name: String,
    address: String,
    ruc: String,
    phone: String,
    start: String,
    feel:String,
    chiefId: String,
    end: String,
    speciality: String,
    city: String,
    services:[{ref:'Service',type:Schema.Types.ObjectId}],
    photos :[{ref:'Photo',type:Schema.Types.ObjectId}],
    latitude:Number,
    longitude:Number,
    slug: String,
    createdAt:{
        type:Date,
        default: new Date()
    }
});
restaurantSchema.plugin(mongoosePaginate);
restaurantSchema.plugin(random, { path: 'r' });
module.exports = mongoose.model('Restaurant',restaurantSchema);
