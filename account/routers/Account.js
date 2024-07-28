const express = require("express");
const User = require("../models/User");
const { mongoose } = require("mongoose");

const router = express.Router();

// router account register
router.post("/api/users/signup", async (req, res) => {
  const { numberPhone, fullName, gender, birthday, password, status } =
    req.body;
  const existedNumberPhone = await User.findOne({ numberPhone });

  try {
    if (existedNumberPhone) {
      res.status(404).send("This number phone already exists");
    } else {
      const user = await User.create({
        numberPhone,
        fullName,
        gender,
        birthday,
        password,
        status,
      });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router get all account
router.get("/api/getUser", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json(users);
});

// router get account by number phone
router.get("/api/get_user/find_number_phone/:numberPhone", async (req, res) => {
  const numberPhone = req.params.numberPhone;
  User.findOne({ numberPhone: numberPhone })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Number not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error when find number phone" })
    );
});

// router get account by id
router.get("/api/get_user/find_id_user/:_id", async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No user with id: ${_id}`);
  }
  const user = await User.findById(_id);
  // if (!user) {
  //   return res.status(404).send(`No user with id: ${_id}`);
  // }
  res.status(200).json(user);
});

// router update account by id
router.patch("/api/update_user/:_id", async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No user with id: ${id}`);
  }
  if (req.body.numberPhone) {
    const existedNumberPhone = await User.findOne({
      numberPhone: req.body.numberPhone,
      _id: { $ne: _id }, // Trừ _id hiện tại
    });
    if (existedNumberPhone) {
      return res.status(400).send("This number phone already exists");
    }
  }
  const newUser = await User.findOneAndUpdate({ _id: _id }, { ...req.body });
  if (!newUser) {
    return res.status(404).send(`Update fail`);
  }
  res.status(200).json(newUser);
});

module.exports = router;
