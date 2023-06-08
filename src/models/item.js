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
  scheduleTime: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', ItemsSchema);

module.exports = Item;
