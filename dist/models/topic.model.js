"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const topicSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const Topic = mongoose_1.default.model("Topic", topicSchema, "topics");
exports.default = Topic;
