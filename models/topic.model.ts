import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    avatar: String,
    status: String,
    slug: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicSchema, "topics");

export default Topic;
