import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    avatar: String,
    description: String,
    token: String,
    email: String,
    password: String,
    status: String,
    favoritesList: Array,
    expireAt: {
      type: Date,
      expires: 180,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");

export default User;
