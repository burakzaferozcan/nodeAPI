const express = require("express");
const { login, register } = require("../controllers/auth.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router.post("/login", auth, login);
router.post("/register", register);

module.exports = router;
