const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es requerido"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La descripción del producto es requerida"],
  },
  price: {
    type: Number,
    required: [true, "El precio del producto es requerido"],
    maxlength: [8, "El precio es de hasta 8 dígitos"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "La categoría es requerida"],
  },
  Stock: {
    type: Number,
    required: [true, "El stock es requerido"],
    maxlength: [4, "El stock es de hasta 4 dígitos"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
