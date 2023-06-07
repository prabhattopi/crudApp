const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 200,
  },
});

const Item = mongoose.model('Item', ItemsSchema);

module.exports = Item;
