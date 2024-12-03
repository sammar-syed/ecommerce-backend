const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
//   countInStock: {
//     type: Number, // This field must match the request body
//     required: true,
//   },
  date: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Product', ProductSchema);
