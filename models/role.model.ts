import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const roleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    permissions: Array,
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

const Role = mongoose.model("Role", roleSchema, "roles");

export default Role;
