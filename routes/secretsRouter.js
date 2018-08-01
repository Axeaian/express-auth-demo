const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "Success! You can not see this without a token" });
});

module.exports = router;
