const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema(
  {
    Ten: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    soKyHanhLy: {
      type: Number,
      required: true,
    },
    hangVe: {
      type: String,
      required: true,
    },
    giaVe: {
      type: Number,
      required: true,
    },
    maDon: {
      type: String,
      required: true,
    },
    chuyenBayId: {
      type: String,
      required: true,
    },
    trangThaiVe: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Ticket", TicketSchema);
