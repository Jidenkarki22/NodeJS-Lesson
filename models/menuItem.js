const mongoose =  require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      taste: {
        type: String,
        required: true,
        enum: ['sweet', 'spicy', 'salty'], // taste can be customized
      },
      ingredients: {
        type: Boolean,
        default: []
      },
      price: {
        type: Number,
        required: true,
      },
      is_drink: {
        type: Boolean,
        default: false
      }
})

const menuItem = mongoose.model('menuItem',menuItemSchema);
module.exports = menuItem;