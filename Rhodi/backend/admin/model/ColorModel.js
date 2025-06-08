const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },  // Ví dụ: M001
  name: { type: String, required: true },
  status: { type: Number, default: 1 }, // 0: Ẩn, 1: Hiện
}, {
  timestamps: true,
});

const Color = mongoose.model('Color', colorSchema);
module.exports = Color;
