const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: Number, default: 1 }, // Hoạt động: 1, Không hoạt động: 0
    count: { type: Number, default: 1 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Liên kết với Category model
    required: true
  },
});

module.exports = mongoose.model('Size', sizeSchema);
