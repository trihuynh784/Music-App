import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const singerSchema = new mongoose.Schema({
  fullName: String,
  avatar: String,
  status: String,
  description: String,
  slug: {
    type: String,
    slug: "fullName",
    unique: true,
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
});

const Singer = mongoose.model("Singer", singerSchema, "singers");

export default Singer;
