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
exports.deleteUser = exports.editCell = exports.clearCollection = exports.filterVerified = exports.filteredFetch = exports.createMany = void 0;
const users_model_1 = require("../models/users.model");
const sample_users_1 = require("../sample_users");
const createMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield users_model_1.User.insertMany(sample_users_1.sample_users);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
});
exports.createMany = createMany;
const filteredFetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let order = (_a = req.query.order) !== null && _a !== void 0 ? _a : 1;
        let sortBy = (_b = req.query.sortBy) !== null && _b !== void 0 ? _b : '_id';
        let limit = req.query.limit ? parseInt(req.query.limit) : 3;
        let skip = Number(req.query.skip) ? Number(req.query.skip) : 0;
        const sort = { [sortBy]: order };
        let totalDoc = yield users_model_1.User.countDocuments();
        let pages = Math.ceil(totalDoc / limit);
        let pageNumber = Number(req.query.page) ? Number(req.query.page) : 1;
        let startFrom = (pageNumber - 1) * limit;
        let data = yield users_model_1.User.find({}).sort(sort).skip(skip).skip(startFrom).limit(limit);
        res.status(200).json({
            data,
            pages,
            pageNumber,
        });
    }
    catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
});
exports.filteredFetch = filteredFetch;
const filterVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        let { verified } = (_c = req.body) !== null && _c !== void 0 ? _c : false;
        let data = yield users_model_1.User.find({ verified: verified });
        res.status(200).json(data);
    }
    catch (e) {
        //console.log(e)
        res.status(400).json({
            error: e.message
        });
    }
});
exports.filterVerified = filterVerified;
const clearCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_model_1.User.remove({});
        res.status(200).json({
            msg: 'Collection cleared'
        });
    }
    catch (e) {
    }
});
exports.clearCollection = clearCollection;
const editCell = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id, formData } = req.body;
        let obj = {};
        for (let key in formData) {
            obj[key] = formData[key];
        }
        console.log(obj);
        let data = yield users_model_1.User.findByIdAndUpdate(id, obj);
        data = yield users_model_1.User.findById(id);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
});
exports.editCell = editCell;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.body;
        yield users_model_1.User.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'User deleted'
        });
    }
    catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
});
exports.deleteUser = deleteUser;
