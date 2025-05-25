const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Cấu hình biến môi trường
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("bạn đã chạy thành công");
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
