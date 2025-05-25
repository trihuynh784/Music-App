import mongoose from "mongoose";

const singerSchema = new mongoose.Schema({
  fullName: String,
  avatar: String,
  status: String,
  slug: String,
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Singer = mongoose.model("Singer", singerSchema, "singers");

export default Singer;