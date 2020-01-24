let mongoose = require('mongoose');

// Article Schema
let bidSchema = mongoose.Schema({
  user_name:{
    type: String,
    required: true
  },
  bid_price:{
    type: Number,
    required: true
  },
  bid_date:{
    type: Date,
    required: true
  },
  deadline:{
    type: Date,
    required: true
  }
});

let Bid = module.exports = mongoose.model('Bid', bidSchema);
