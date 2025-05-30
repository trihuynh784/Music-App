"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const accountSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const Account = mongoose_1.default.model("Account", accountSchema, "accounts");
exports.default = Account;
