const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  code: { type: String, required: true } ,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  type: { type: String, enum: ['online', 'offline'], required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },  // Trường nhân viên

  shippingAddress: {
    recipientName: String,
    phone: String,
    address: String,
    note: String,
  },

  products: [
    {
      productDetailId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetail', required: true },
      productName: String,
      color: String,
      size: String,
      category: String,
      quantity: Number,
      unitPrice: Number,
      discountAmount: { type: Number, default: 0 },
      finalPrice: Number,
      productPromotion: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductPromotion', default: null },
    }
  ],

  // Trường khuyến mãi áp dụng cho hóa đơn (nếu có)
  invoicePromotion: {
    promotionId: { type: mongoose.Schema.Types.ObjectId, ref: 'PromotionProgram', default: null },
    discountRate: { type: Number,default: 0 },
    discountValue: { type: Number, default: 0 },  // Số tiền đã giảm tính trên hóa đơn
  },
  
  voucher: {
    voucherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher', default: null },
    code: String,
    discountAmount: { type: Number, default: 0 }
  },

  totalAmount: { type: Number, default: 0 },  // Loại bỏ "required" vì không cần thiết
  paymentMethod: { type: String, enum: ['vnpay', 'cash', 'bank'], default: 'cash' },  // Loại bỏ "required" vì không cần thiết
  status: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
