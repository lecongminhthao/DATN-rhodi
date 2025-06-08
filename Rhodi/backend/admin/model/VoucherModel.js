const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // Mã voucher
  discountAmount: { type: Number, required: true }, // Số tiền giảm
  minOrderAmount: { type: Number, default: 0 }, // Giá trị hóa đơn tối thiểu
  startDate: { type: Date, default: Date.now, required: true },
  endDate: { type: Date, required: true }, // Ngày kết thúc
  status: {
    type: String,
    enum: ['active', 'expired', 'used', 'disabled'],
    default: 'active'
  },
  batchId: { type: String, required: true } // ID của đợt voucher
});

// Hook kiểm tra tự động cập nhật trạng thái nếu đã hết hạn
voucherSchema.pre('save', function (next) {
  const now = new Date();
  if (this.endDate < now && this.status === 'active') {
    this.status = 'expired';
  }
  next();
});

// Optional: cập nhật khi gọi .findOneAndUpdate()
voucherSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update && update.endDate && update.status === 'active') {
    const now = new Date();
    if (new Date(update.endDate) < now) {
      update.status = 'expired';
    }
  }
  next();
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
