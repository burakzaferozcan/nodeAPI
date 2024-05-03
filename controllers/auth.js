const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (user) {
      return res
        .status(500)
        .json({ message: "böyle bir kullanıcı zaten var " });
    }
    if (password.length < 8) {
      res.status(500).json({ message: "şifre 8 karakterden uzun olmalı" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Auth.create({
      username,
      password: hashedPassword,
      email,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN);
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "burada bir hata var" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "kullanıcı bulunamadı" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(500).json({ message: "şifre yanlış" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN);
    res.status(200).json({
      status: "OK",
      message: "giriş başarılı",
      ...user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "burada bir hata var" });
  }
};
module.exports = { login, register };
