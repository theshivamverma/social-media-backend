const express = require("express");

const router = express.Router();

const {
  isAuthenticated,
} = require("../middlewares/isAuthenticated.middleware");

const {
  getUserDataFromDB,
  sendUserData,
  updateUserInfo,
  followUser,
  viewUserDetail,
  getUserDetailFromParam,
  unfollowUser,
} = require("../controllers/user.controller");

router.param("userId", getUserDetailFromParam);
router.route("/:userId/detail").get(viewUserDetail);

router.use(isAuthenticated);
router.use(getUserDataFromDB);

router.route("/userdetail").get(getUserDataFromDB, sendUserData);
router.route("/update").post(updateUserInfo);
router.route("/follow").post(followUser);
router.route("/unfollow").post(unfollowUser);

module.exports = router;
