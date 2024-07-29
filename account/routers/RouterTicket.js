const express = require("express");
const Ticket = require("../models/Ticket.js");
const { mongoose } = require("mongoose");

const router = express.Router();

// router add ticket
router.post("/api/add_ticket", async (req, res) => {
  const {
    Ten,
    phoneNumber,
    soKyHanhLy,
    hangVe,
    giaVe,
    maDon,
    chuyenBayId,
    trangThaiVe,
  } = req.body;

  try {
    const ticket = await Ticket.create({
      Ten,
      phoneNumber,
      soKyHanhLy,
      hangVe,
      giaVe,
      maDon,
      chuyenBayId,
      trangThaiVe,
    });
    res.status(200).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post("/api/post_status_donhang", async (req, res) => {
  const { maDon, trangThaiVe } = req.body;

  try {
    res.status(200).json({ message: req.body });
    const fetchDH = await fetch(
      `https://vercel-travrel.vercel.app/api/update_donhang/${maDon}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trangThai: "Thanh toán thanh công",
        }),
      }
    );
    if (!fetchDH.ok) {
      throw new Error("Not change status don hang", maDon);
    }
    const data = await fetchDH.json();
    console.log("Cập nhật trạng thái đơn hàng thành công:", data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// router.get("/api/get_status_donhang", async (req, res) => {
//   const { maDon, trangThaiVe } = req.params;

//   try {
//     const ticket = await Ticket.create({
//       maDon,
//       trangThaiVe,
//     });
//     res.status(200).json(ticket);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// router get all ticket
router.get("/api/get_all_tickets", async (req, res) => {
  const ticket = await Ticket.find();
  res.status(200).json(ticket);
});

// router get a ticket
router.get("/api/get_ticket/:_id", async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No ticket with id: ${_id}`);
  }
  const ticket = await Ticket.findById(_id);

  res.status(200).json(ticket);
});

// router update ticket
router.patch("/api/update_ticket/:_id", async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No hoa don");
  }
  const newTicket = await Ticket.findOneAndUpdate(
    { _id: _id },
    { ...req.body }
  );
  if (!newTicket) {
    return res.status(404).send("Update don hang");
  }
  res.status(200).json(newTicket);
});

//router delete ticket
router.delete("/api/delete_ticket/:_id", async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No ticket with id: ${_id}`);
  }
  const deleteTicket = await Ticket.findOneAndDelete({ _id: _id });
  if (!deleteTicket) {
    return res.status(400).json({ error: "DH not found or already deleted" });
  }
  const updated = await Ticket.find().sort({ createAt: -1 });
  res.status(200).json(updated);
});

module.exports = router;
