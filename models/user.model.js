const mongoose = require("mongoose")
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: "firstname is mandatory",
    },
    username: {
      type: String,
      required: "username is mandatory",
    },
    email: {
      type: String,
      required: "email is mandatory",
    },
    password: {
      type: String,
      required: "password is required",
    },
    profilePicUrl: {
      type: String,
    },
    coverPicUrl: {
      type: String,
    },
    website: {
      type: String,
    },
    bio: {
      type: String,
    },
    myPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    retweetedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema)

module.exports = { User }