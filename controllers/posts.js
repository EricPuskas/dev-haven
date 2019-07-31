// Load Database
const db = require("../models");
const validatePostsInput = require("../middleware/validation/posts");
const validateCommentsInput = require("../middleware/validation/comments");
const { sendError, rmFromArr, exists } = require("./utils");

exports.createPost = async (req, res) => {
  try {
    const { errors, isValid } = validatePostsInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const user = await db.User.findById(req.user.id).select("-password");
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };
    const post = new db.Post(newPost);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await db.Post.find().sort({ createdAt: -1 });
    return posts.length
      ? res.json(posts)
      : sendError(404, "No posts were found", res);
  } catch (err) {
    console.log(err.message);
    return sendError(404, "No posts were found", res);
  }
};

exports.getPostByID = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return post ? res.json(post) : sendError(404, "Post not found", res);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      // If Object ID from URL is invalid, wrong format, too lengthy or too short etc.
      return sendError(404, "Post not found", res);
    }
    res.status(500).send("Server error.");
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post exists
    if (!post) return sendError(404, "Post not found", res);
    // check if user owns the post
    if (post.user.toString() !== req.user.id)
      return sendError(404, "Unauthorized", res);
    // Delete post
    await post.remove();
    res.json({ success_message: "Post Removed." });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      // If Object ID from URL is invalid, wrong format, too lengthy or too short etc.
      return sendError(404, "Post not found", res);
    }
    res.status(500).send("Server error.");
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been liked.
    let liked = exists(post.likes, req.user.id);
    console.log(liked);
    if (liked) return sendError(400, "Post already liked.", res);
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error.");
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already been liked.
    let liked = exists(post.likes, req.user.id);
    if (!liked) {
      return sendError(400, "Post has not yet been liked.", res);
    }
    // Remove from Array
    rmFromArr(post.likes, req.user.id);
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
};

exports.addComment = async (req, res) => {
  try {
    const { errors, isValid } = validateCommentsInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};

exports.removeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if comment exists
    const comment = exists(post.comments, comment_id);
    if (!comment) return sendError(404, "Comment not found.", res);
    // Check user authorization
    if (comment.user.toString() !== req.user.id) {
      return sendError(401, "Unauthorized.", res);
    }
    rmFromArr(post.comments, req.user.id);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error.");
  }
};

module.exports = exports;
