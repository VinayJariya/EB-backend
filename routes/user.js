const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRETKEY } = require("./../utils/keys");

const User = require("./../schemas/user");
const { isAuthorized, isAdmin } = require("../utils/auth");

router.post("/", isAuthorized, isAdmin, async (req, res) => {
  const user = new User({
    ...req.body,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.status(201).send({
    success: true,
    user: user,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username: username,
  });
  if (!user) {
    res.status(404).send({
      success: false,
      message: "User not found",
    });
  } else {
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    } else {
      const payload = {
        id: user.id,
        name: user.username,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(payload, SECRETKEY, {
        expiresIn: 3600,
      });
      res.status(200).send({
        success: true,
        token: token,
      });
    }
  }
});

router.get("/", isAuthorized, async (req, res) => {
  const users = await User.find()
  .skip(((req.query.pageNumber - 1) * req.query.pageSize) || 0)
  .limit(req.query.pageNumber || 10)
  res.status(200).send({
    success: true,
    users: users,
  });
});

module.exports = {
  userRouter: router,
};
