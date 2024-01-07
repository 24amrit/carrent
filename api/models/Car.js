const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks:[String],
    extraInfo: String,
    pickUp: Number,
    dropOff: Number,
    maxMembers: Number,
    price: Number,
});

const CarModel = mongoose.model('Cars', carSchema);

module.exports = CarModel;