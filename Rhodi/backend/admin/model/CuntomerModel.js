// models/Customer.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true }, // Có thể dùng email cũng được
  password: { type: String, required: true },

  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },

  createdAt: { type: Date, default: Date.now },
});

// Mã hóa mật khẩu trước khi lưu
customerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// So sánh mật khẩu khi login
customerSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('Customer', customerSchema);
