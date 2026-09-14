const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true  // Each product must belong to a specific user
  },
  ProductName: {
    type: String,
    required: true,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  ProductBarcode: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now  // Automatically track creation timestamp
  }
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;