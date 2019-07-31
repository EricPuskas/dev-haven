const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostByID,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  removeComment
} = require("../controllers/posts");

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post("/", requireAuth, createPost);

// @route  GET api/posts
// @desc   GET all post
// @access Private
router.get("/", requireAuth, getPosts);

// @route  GET api/posts/:id
// @desc   GET post by ID
// @access Private
router.get("/:id", requireAuth, getPostByID);

// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access Private
router.delete("/:id", requireAuth, deletePost);

// @route  PUT api/posts/like/:id
// @desc   Like a post
// @access Private
router.put("/like/:id", requireAuth, likePost);

// @route  PUT api/posts/unlike/:id
// @desc   Unlike a post
// @access Private
router.put("/unlike/:id", requireAuth, unlikePost);

// @route  POST api/posts/comment/:id
// @desc   Comment on a post
// @access Private
router.post("/comment/:id", requireAuth, addComment);

// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Remove a comment
// @access Private
router.delete("/comment/:id/:comment_id", requireAuth, removeComment);

module.exports = router;
