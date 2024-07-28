const mongoose = require("mongoose");

const FlightSchema = mongoose.Schema(
  {
    timeDi: {
      type: String,
      required: true,
    },
    dateDi: {
      type: String,
      required: true,
    },
    timeDen: {
      type: String,
      required: true,
    },
    dateDen: {
      type: String,
      required: true,
    },
    diemDi: {
      type: String,
      required: true,
    },
    diemDen: {
      type: String,
      required: true,
    },
    giaVeGoc: {
      type: Number,
      required: true,
    },
    soGheThuong: {
      type: Number,
      required: true,
    },
    soGheThuongGia: {
      type: Number,
      required: true,
    },

    khoiLuongQuyDinhTrenMotVe: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Flight", FlightSchema);
