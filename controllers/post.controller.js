const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { extend } = require("lodash")

async function createNewPost(req, res) {
  try {
    const { postData } = req.body;
    console.log({postData})
    postData.userId = req.userId;
    const newPost = await Post.create(postData);
    const savedPost = await newPost.save();
    const { user } = req;
    user.myPosts.push(savedPost._id);
    const savedUser = await user.save();
    res
      .status(200)
      .json({ success: true, message: "Post created", savedPost, savedUser });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error creating post",
        errorMessage: error.message,
      });
  }
}

async function getPostFromParam(req, res, next, id) {
  try {
    const post = await Post.findById(id).populate("userId").populate("likedBy").populate("retweetedBy")
    if (!post) {
      res
        .status(400)
        .json({ success: false, message: "error getting post detail" });
    }
    req.post = post;
    next();
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error getting post detail",
        errorMessage: error.message,
      });
  }
}

function sendPostDetail(req, res) {
  const { post } = req;
  res.status(200).json({ success: true, post });
}

async function likePost(req, res) {
  try {
    const { user } = req;
    const { post } = req;
    user.likedPosts.push(post._id);
    const savedUser = await user.save();
    post.likedBy.push(user._id);
    const updatedPost = await post.save();
    res
      .status(200)
      .json({ success: true, message: "post liked", savedUser, updatedPost });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error liking post",
        errorMessage: error.message,
      });
  }
}

async function retweetPost(req, res) {
  try {
    const { user } = req;
    const { post } = req;
    user.retweetedPosts.push(post._id);
    const savedUser = await user.save();
    post.retweetedBy.push(user._id);
    const updatedPost = await post.save();
    res
      .status(200)
      .json({ success: true, message: "post liked", savedUser, updatedPost });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error liking post",
        errorMessage: error.message,
      });
  }
}

async function editPost(req, res){
    try {
        const { updatedPost } = req.body;
        let { post } = req
        post = extend(post, updatedPost)
        const savedPost = await post.save()
        res.status(200).json({ success: true, message: "post updated", savedPost })
    } catch (error) {
         res.status(400).json({
           success: false,
           message: "error updating post",
           errorMessage: error.message,
         });
    }
}

async function deletePost(req, res){
    try {
        const { postId } = req.body;
        const deletedPost = await Post.findByIdAndDelete(postId)
        res.status(200).json({ success: true, message: "Post deleted", deletedPost })
    } catch (error) {
        res.status(400).json({ success: false, message: "error deleting post", errorMessage: error.message })
    }
}

module.exports = {
  createNewPost,
  getPostFromParam,
  sendPostDetail,
  likePost,
  retweetPost,
  editPost,
  deletePost
};
