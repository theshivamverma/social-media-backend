const { User } = require("../models/user.model");
const { extend } = require("lodash");

async function getUserDataFromDB(req, res, next) {
  try {
    const { userId } = req;
    const user = await User.findById(userId)
      .populate("followers")
      .populate("myPosts")
      .populate("following")
      .populate("likedPosts")
      .populate("retweetedPosts")

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "error getting user data" });
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error getting user data",
        errorMessage: error.message,
      });
  }
}

async function sendUserData(req, res) {
  const { user } = req;
  user.password = undefined;
  res.status(200).json({ success: true, user });
}

async function updateUserInfo(req, res) {
  try {
    const { updateUser } = req.body;
    let { user } = req;
    user = extend(user, updateUser);
    const savedUser = await user.save();
    res
      .status(200)
      .json({ success: true, message: "User data updated", savedUser });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error updating user",
        errorMessage: error.message,
      });
  }
}

async function followUser(req, res) {
  try {
    const { userId } = req.body;
    const userToBeFollowed = await User.findById(userId);
    const followingUserId = req.userId;
    userToBeFollowed.followers.push(followingUserId);
    const updatedFollowedUser = await userToBeFollowed.save();
    const { user } = req;
    user.following.push(userId);
    const updatedUser = await user.save();
    res.status(200).json({ success: true, message: "followed", updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error following user",
        errorMessage: error.message,
      });
  }
}

async function unfollowUser(req, res) {
  try {
    const { userId } = req.body;
    const userToBeUnFollowed = await User.findById(userId);
    const followingUserId = req.userId;
    userToBeUnFollowed.followers.pull(followingUserId);
    const updatedUnFollowedUser = await userToBeUnFollowed.save();
    const { user } = req;
    user.following.pull(userId);
    const updatedUser = await user.save();
    res.status(200).json({ success: true, message: "followed", updatedUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error following user",
      errorMessage: error.message,
    });
  }
}

async function getUserDetailFromParam(req, res, next, id) {
  try {
    const userDetail = await User.findById(id)
      .populate("followers")
      .populate("myPosts")
      .populate("following")
      .populate("likedPosts")
      .populate("retweetedPosts");
    if (!userDetail) {
      res
        .status(400)
        .json({ success: false, message: "error getting user data" });
    }
    req.userDetail = userDetail;
    next();
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "error getting user data",
        errorMessage: error.message,
      });
  }
}

function viewUserDetail(req, res) {
  const { userDetail } = req;
  userDetail.email = undefined;
  userDetail.password = undefined;
  res.status(200).json({ success: true, userDetail });
}

module.exports = {
  getUserDataFromDB,
  sendUserData,
  updateUserInfo,
  followUser,
  unfollowUser,
  getUserDetailFromParam,
  viewUserDetail,
};
