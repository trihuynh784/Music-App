import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const songSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    like: {
      type: Number,
      default: 0,
    },
    listen: {
      type: Number,
      default: 0,
    },
    lyrics: String,
    audio: String,
    status: String,
    usersLiked: Array,
    slug: {
      type: String,
      slug: "title",
      unique: true
    },
    createdBy: {
      userId: String,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
    updatedBy: [
      {
        userId: String,
        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema, "songs");

export default Song;
