const express = require("express");
const DonHang = require("../models/DonHang.js");
const mongoose = require("mongoose");

const router = express.Router();

// router add donhang
router.post("/api/add_donhang", async (req, res) => {
  const { userId, soLuongVe, tongGia, trangThai } = req.body;

  try {
    const dh = await DonHang.create({
      userId,
      soLuongVe,
      tongGia,
      trangThai,
    });
    res.status(200).json(dh);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// router find id donhang
router.get("/api/get_donhang/:_id", async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No don hang with id: ${_id}`);
  }
  const donhang = await DonHang.findById(_id);

  res.status(200).json(donhang);
});

// router delete donhang
router.delete("/api/delete_donhang/:_id", async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No don hang with id: ${_id}`);
  }
  const deleteDH = await DonHang.findOneAndDelete({ _id: _id });
  if (!deleteDH) {
    return res.status(400).json({ error: "DH not found or already deleted" });
  }
  // Nếu bạn muốn gửi lại danh sách cập nhật của các don hang sau khi xóa
  const updateDH = await DonHang.find().sort({ createAt: -1 });
  res.status(200).json(updateDH);
});

// router get all don hang
router.get("/api/get/all_donhang", async (req, res) => {
  const donhang = await DonHang.find().sort({ createdAt: -1 });
  res.status(200).json(donhang);
});

// router update don hang
router.patch("/api/update_donhang/:_id", async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No hoa don");
  }
  const newHD = await DonHang.findOneAndUpdate({ _id: _id }, { ...req.body });
  if (!newHD) {
    return res.status(404).send("Update don hang");
  }
  res.status(200).json(newHD);
});

module.exports = router;