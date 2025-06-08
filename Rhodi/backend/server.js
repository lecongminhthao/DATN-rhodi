const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
// Cấu hình biến môi trường
const authRoutes = require("./admin/routers/Auth");
const ColorRouter = require("./admin/routers/ColorRouter");
const authMiddleware = require("./admin/middleware/authMiddleware");
const ProductDetailRouter = require("./admin/routers/ProductDetailRouter");
const employeeRoutes = require("./admin/routers/EmployessRouter");
const categoryRouter = require("./admin/routers/CategoryRouter");
const sizeRouter = require("./admin/routers/SizeRouter");
const ProductRouter = require("./admin/routers/ProductRouter");
const productTypeRouter = require('./admin/routers/ProductTypeRouter'); 
const imageRouter = require('./admin/routers/ImageRouter');



dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});
app.use("/api", authRoutes);
app.use("/admin", authMiddleware(["Admin"]), ColorRouter);
app.use("/admin", authMiddleware(["Admin"]), employeeRoutes);
app.use("/admin", authMiddleware(["Admin"]), ProductDetailRouter);
app.use("/admin", authMiddleware(["Admin"]), categoryRouter);
app.use("/admin", authMiddleware(["Admin"]), sizeRouter);
app.use("/admin", authMiddleware(["Admin"]), ProductRouter);
app.use("/admin", authMiddleware(["Admin"]), productTypeRouter);
app.use("/admin", authMiddleware(["Admin"]), imageRouter);


mongoose
  .connect("mongodb://127.0.0.1:27017/rhodi-datn")
  .then(() => console.log(" kết nối thành công!"))
  .catch((err) => {
    console.error(" thất bại rồi:", err);
    process.exit(1);
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});