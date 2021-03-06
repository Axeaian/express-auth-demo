const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { COOKIE_SECURE_OPTION } = require("../config/utils");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Express is up!" });
});

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({ username, bio: "some bio" });
  user.setHashedPassword(password);
  try {
    await user.save();
    res.json({ user: user.withoutSecrets() });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(401).json({ message: "no such user found" });
  }

  if (user.validatePassword(password)) {
    const userId = { id: user.id };
    const token = jwt.sign(userId, process.env.JWT_SECRET);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: COOKIE_SECURE_OPTION
    });
    res.json({ message: "ok" });
  } else {
    res.status(401).json({ message: "passwords did not match" });
  }
});

module.exports = router;
