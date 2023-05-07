const mongoose = require('mongoose');

const carpark = new mongoose.Schema({
  data: {type:String},
});

const SensorData = mongoose.model('carpark', carpark,'parking');
module.exports = SensorData;