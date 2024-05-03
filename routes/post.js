const express = require("express");
const {
  getAllPosts,
  updatePost,
  deletePost,
  getSinglePost,
  createPost,
} = require("../controllers/post");
const router = express.Router();
router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.put("/posts/:id", updatePost);
router.get("/posts/:id", getSinglePost);
router.delete("/posts/:id", deletePost);
module.exports = router;
