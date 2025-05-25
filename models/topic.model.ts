import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const topicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    avatar: String,
    status: String,
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
  {
    timestamps: true,
  }
);

const Topic = mongoose.model("Topic", topicSchema, "topics");

export default Topic;
