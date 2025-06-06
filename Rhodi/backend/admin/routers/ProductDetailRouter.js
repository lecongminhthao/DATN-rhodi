const express = require("express");
const router = express.Router();
const ProductDetailController = require("../controller/ProductDetailController");

router.post("/productdetail", ProductDetailController.createProductDetail);
router.post(
  "/productdetail/check-barcode",
  ProductDetailController.checkBarcode
);
router.get("/productdetails", ProductDetailController.getProductDetailList);
router.get("/productdetail/:id", ProductDetailController.getProductDetailById);

router.put("/productdetail/:id", ProductDetailController.updateProductDetail);

module.exports = router;
