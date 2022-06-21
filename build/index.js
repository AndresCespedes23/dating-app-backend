"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const Cards_1 = __importDefault(require("./Schema/Cards"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.DATABASE_URL)
    .then(() => {
    console.log("🟢 DB Connected");
    app.listen({ port: process.env.PORT }, () => {
        console.log(`🏃‍♂️ Server running on port ${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.log("🔴 There was an error on the DB connection method.");
    console.log(err);
});
// Routes
app.get("/", (_req, res) => res.status(200).send("Hello World!"));
app.post("/dating/cards", (req, res) => {
    const dbCard = req.body;
    Cards_1.default.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    });
});
app.get("/dating/cards", (_req, res) => {
    Cards_1.default.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });
});
