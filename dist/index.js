"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express')
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_route_1 = require("./routes/users.route");
dotenv_1.default.config();
let mongo_url = ((_a = process.env.MONGO_LOCAL_URL) === null || _a === void 0 ? void 0 : _a.toString()) || 'mongodb://localhost:27017/test';
const app = (0, express_1.default)();
const port = process.env.PORT;
// MiddleWare
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
app.use('/api', users_route_1.userRoute);
// Connect to MongoDB
mongoose_1.default.connect(mongo_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log('Database Connected'));
app.get('/', (req, res) => {
    res.send('Express + Typescript server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
