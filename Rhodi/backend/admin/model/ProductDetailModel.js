const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductDetailSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Liên kết với Product
  color: { type: Schema.Types.ObjectId, ref: 'Color', required: true },
  size: { type: Schema.Types.ObjectId, ref: 'Size', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  producttype: { type: Schema.Types.ObjectId, ref: 'ProductType', required: true }, // Liên kết với ProductType (trước là DMSP)
  quantity: { type: Number, required: true },
  barcode: { type: String, required: true, unique: true },
  status: { type: Number, default: 1 },
}, { timestamps: true });

// Tự động populate các trường liên kết khi thực hiện query
ProductDetailSchema.pre('find', function(next) {
  this.populate('color', 'name'); // Lấy tên màu
  this.populate('size', 'name');  // Lấy tên kích cỡ
  this.populate('category', 'name');  // Lấy tên danh mục
  this.populate('producttype', 'name'); // Lấy tên loại sản phẩm (ProductType)
  this.populate('product', 'name importPrice salePrice'); // Lấy tên sản phẩm từ Product
  next();
});

module.exports = mongoose.model('ProductDetail', ProductDetailSchema);
