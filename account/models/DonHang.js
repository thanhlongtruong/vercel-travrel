const mongoose = require("mongoose");

const DonHangSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    soLuongVe: {
      type: Number,
      required: true,
    },
    tongGia: {
      type: Number,
      required: true,
    },
    trangThai: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("DonHang", DonHangSchema);
