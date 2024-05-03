const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

db();

app.use("/api", authRoutes);
app.use("/api", postRoutes);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
