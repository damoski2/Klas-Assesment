"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.post('/createMany', user_controller_1.createMany);
