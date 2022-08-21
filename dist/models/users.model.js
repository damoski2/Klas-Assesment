"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        maxLength: 100,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    country: {
        type: String,
        required: true,
        enum: ['India', 'USA', 'UK', 'Canada']
    }
});
exports.User = mongoose_1.default.model('User', userSchema);
