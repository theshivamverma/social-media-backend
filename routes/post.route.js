const express = require("express");

const router = express.Router();

const {
  isAuthenticated,
} = require("../middlewares/isAuthenticated.middleware");

const { getUserDataFromDB } = require("../controllers/user.controller");
const {
  createNewPost,
  getPostFromParam,
  sendPostDetail,
  likePost,
  retweetPost,
  editPost,
  deletePost,
} = require("../controllers/post.controller");

router.param("postId", getPostFromParam)

router.route("/:postId").get(sendPostDetail)

router.use(isAuthenticated)
router.use(getUserDataFromDB)

router.route("/create").post(createNewPost);

router.route("/:postId/like").get(likePost)

router.route("/:postId/retweet").get(retweetPost)

router.route("/:postId/edit").post(editPost)

router.route("/delete").post(deletePost)

module.exports = router
