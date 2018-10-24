const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const username = req.user.username;
  res.json({ message: `Success! ${username}, you are on a protected page` });
});

module.exports = router;
