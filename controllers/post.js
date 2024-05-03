const Post = require("../models/post");
const createPost = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newPost = await Post.create({
      title,
      description,
    });
    res.status(201).json({ newPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Gönderi bulunamadı" });
    }
    post.title = req.body.title;
    post.description = req.body.description;
    const updatedPost = await post.save();
    res.json({
      status: "OK",
      message: "Gönderi başarıyla güncellendi",
      updatedPost,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Gönderi bulunamadı" });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ post, message: "Gönderi başarıyla silindi" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Gönderi bulunamadı" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getSinglePost,
};
