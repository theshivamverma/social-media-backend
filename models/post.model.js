const mongoose = require("mongoose")

const { Schema } = mongoose

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    postText: {
        type: String,
        required: "post cannot be empty"
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    retweetedBy: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true })

const Post = mongoose.model("Post", PostSchema)

module.exports = { Post }