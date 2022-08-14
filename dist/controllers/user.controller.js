"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMany = void 0;
const users_model_1 = require("../models/users.model");
const sample_users_1 = require("../sample_users");
const createMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield users_model_1.User.insertMany(sample_users_1.sample_users);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(400).json({
            error: e
        });
    }
});
exports.createMany = createMany;
