const express = require("express");
const Flight = require("../models/Flight.js");
const { mongoose, deleteModel } = require("mongoose");

const router = express.Router();

// router add flight
router.post("/api/add_flight", async (req, res) => {
  const {
    timeDi,
    dateDi,
    timeDen,
    dateDen,
    diemDi,
    diemDen,
    giaVeGoc,
    soGheThuong,
    soGheThuongGia,
    khoiLuongQuyDinhTrenMotVe,
  } = req.body;

  try {
    const flight = await Flight.create({
      timeDi,
      dateDi,
      timeDen,
      dateDen,
      diemDi,
      diemDen,
      giaVeGoc,
      soGheThuong,
      soGheThuongGia,
      khoiLuongQuyDinhTrenMotVe,
    });
    res.status(200).json(flight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// router get all flights
router.get("/api/get/all_flights", async (req, res) => {
  const flight = await Flight.find();
  res.status(200).json(flight);
});

// router get a flight
router.get("/api/get/flight/:_id", async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`Not find id: ${_id}`);
  }

  try {
    const flight = await Flight.findById(_id);
    if (!flight) {
      return res.status(404).send(`Flight with id ${_id} not found`);
    }
    res.status(200).json(flight);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching flight");
  }
});
//router update flight
router.patch("/api/update/flight/:_id", async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No flight with id: ${id}`);
  }
  const newFlight = await Flight.findOneAndUpdate(
    { _id: _id },
    { ...req.body }
  );
  if (!newFlight) {
    return res.status(404).send(`Update fail`);
  }
  res.status(200).json(newFlight);
});

//router delete flight
router.delete("/api/delete/flight/:_id", async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  const deleteRes = await Flight.findOneAndDelete({ _id: _id });
  if (!deleteRes) {
    return res
      .status(400)
      .json({ error: "Flight not found or already deleted" });
  }
  // Nếu bạn muốn gửi lại danh sách cập nhật của các flights sau khi xóa
  const updatedFlights = await Flight.find().sort({ createAt: -1 });
  res.status(200).json(updatedFlights);
});

module.exports = router;
