const Product = require("../model/ProductModel");

// tạo sản phẩm
exports.createProduct = async (req, res) => {
  try {
    const { name, status, importPrice, salePrice } = req.body;

    const existingProduct = await checkProductNameExist(name);
    if (existingProduct) {
      return res.status(400).json({ message: "Tên sản phẩm đã tồn tại." });
    }

    const productCode = await generateProductCode();
    const discountPrice = 0;

    const newProduct = new Product({
      name,
      code: productCode,
      status: status || 1,
      importPrice,
      salePrice,
      discountPrice,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Lỗi tạo sản phẩm:", error);
    res.status(500).json({ message: "Không thể tạo sản phẩm.", error: error.message });
  }
};



// cập nhật sản phẩm 
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, importPrice, salePrice, discountPrice } = req.body;

   const existingProduct = await checkProductNameExist(name);
    if (existingProduct) {
      return res.status(400).json({ message: "Tên sản phẩm đã tồn tại." });
    }
    const updatProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        status,
        importPrice,
        salePrice,
        discountPrice,
      },
      { new: true }
    );
    if (!updatProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json(updatProduct);
  } catch (error) {
     console.error("Lỗi tạo sản phẩm:", error);
    res.status(500).json({
      message: "Cập nhật sản phẩm thất bại", error: error.message
    });
  }
};
//xóa sản phẩm

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ message: "Sản phẩm đã được xóa thành công" });
  } catch (error) {
    res.status(500).json({
      message: "Xóa sản phẩm thất bại", error: error.message
    });
  }
};
// lấy sản phẩm theo id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Lấy sản phẩm thất bại", error: error.message
    });
  }
};
// lấy thêm các sảm phẩm theo status
exports.getProductsBystatus = async(req,res)=>{
  try{
    const {status} = req.params;
    const statusNumber = Number(status);
    const products = await Product.find({
      status: statusNumber
    });
    res.status(200).json(products)
  }catch(error){
    res.status(500).json({
      message: "không thể lấy danh sách sản phẩm theo status", error: error.message
    });
  }
}
//lấy sản phẩm theo trang
exports.getAllProducts = async(req,res)=>{
  try {
    const {page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(Number(limit)).exec();
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      products,
      totalPages,
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({
      message : " không thể lấy sản phẩm", error: error.message
    })
  }
}

// kiểm tra sản phẩm có tồn tại hay không ?
const checkProductNameExist = async (name) => {
  const product = await Product.findOne({
    name: { $regex: new RegExp("^" + name + "$", "i") },
  });
  return product;
};

const generateProductCode = async () => {
  const lastProduct = await Product.findOne().sort({ code: -1 }).exec();
  if (!lastProduct) return "P001";

  const lastCode = lastProduct.code;
  const lastNumber = parseInt(lastCode.replace("P", ""));
  const newNumber = lastNumber + 1;

  return `P${newNumber.toString().padStart(3, "0")}`;
};