import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    tokenAdmin: String,
    email: String,
    password: String,
    roleId: String,
    status: String,
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
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema, "accounts");

export default Account;
