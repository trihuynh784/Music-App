"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const roleSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const Role = mongoose_1.default.model("Role", roleSchema, "roles");
exports.default = Role;
