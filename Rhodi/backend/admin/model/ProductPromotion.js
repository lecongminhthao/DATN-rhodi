// models/ProductPromotion.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductPromotionSchema = new Schema({
  promotionProgram: {
    type: Schema.Types.ObjectId,
    ref: 'PromotionProgram',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true, // Tiền giảm cho sản phẩm này
  },
  status: {
    type: Boolean,
    default: true, // Nếu true thì khuyến mãi này đang hoạt động
  },
});

module.exports = mongoose.model('ProductPromotion', ProductPromotionSchema);
