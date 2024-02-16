"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userroute_1 = __importDefault(require("./routes/userroute"));
const todoroute_1 = __importDefault(require("./routes/todoroute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
app.use("/user", userroute_1.default);
app.use("/todo", todoroute_1.default);
mongoose_1.default.connect(config_1.mongoURL).then(() => {
    console.log('db connected');
    app.listen(3000, () => {
        console.log('connected');
    });
})
    .catch((err) => {
    console.log(err);
});
