// models/ProductTypeModel.js
const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },  // Thêm trường code
  name: { type: String, required: true }, // Tên loại sản phẩm (ví dụ: T-shirt, Polo)
  description: { type: String }, // Mô tả loại sản phẩm (không bắt buộc)
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Liên kết với Category model
    required: true
  },
  status: { type: Number, default: 1 }, // Trạng thái sản phẩm (1: Hoạt động, 0: Không hoạt động)
});

module.exports = mongoose.model('ProductType', productTypeSchema);
