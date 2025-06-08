// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true }, // Mã nhân viên
  firstName: { type: String, required: true }, // Họ
  lastName: { type: String, required: true },  // Tên
  phone: { type: String, required: true }, // Số điện thoại
  email: { type: String, required: true, unique: true },  // Email
  dob: { type: Date, required: true }, // Ngày sinh
  role: { type: String, required: true }, // Vai trò
  username: { type: String, required: true, unique: true }, // Tên đăng nhập
  password: { type: String, required: true }, // Mật khẩu
  status: { type: String, required: true }, // Trạng thái
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
