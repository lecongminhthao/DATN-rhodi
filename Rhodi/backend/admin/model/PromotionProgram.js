// models/PromotionProgram.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionProgramSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,  // Đảm bảo mỗi mã voucher là duy nhất
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['product_discount', 'invoice_discount'], // 'product_discount' hoặc 'invoice_discount'
    required: true,
  },
  discountValue: {
    type: Number,
    required: true, // Nếu là 'product_discount' thì là tiền giảm, còn 'invoice_discount' là phần trăm giảm
  },
  minInvoiceValue: {
    type: Number,
    default: 0, // Điều kiện áp dụng: hóa đơn phải >= giá trị này
  },
  maxDiscountAmount: {
    type: Number,
    default: null, // Mức giảm tối đa (áp dụng với invoice_discount)
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'expired'], // 3 trạng thái rõ ràng
    default: 'pending',
  },
  description: {
    type: String,
    default: '', // Mô tả chi tiết về chương trình
  },
});

module.exports = mongoose.model('PromotionProgram', PromotionProgramSchema);
