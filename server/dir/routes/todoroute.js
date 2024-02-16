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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const TodoSchema_1 = require("../db/TodoSchema");
const router = express_1.default.Router();
router.get('/todos', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield TodoSchema_1.Todo.find({});
        return res.status(200).json({
            data: todos,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.post('/todos', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers['userId'];
    const done = false;
    try {
        if (!req.body.title ||
            !req.body.description) {
            return res.status(400).send({
                message: 'Send all required fields: title, description',
            });
        }
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            done,
            userId
        };
        const todo = yield TodoSchema_1.Todo.create(newTodo);
        // io.emit('newTodo', todo)
        return res.status(201).send(todo);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.delete('/todos/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers['userId'];
    const { id } = req.params;
    try {
        const result = yield TodoSchema_1.Todo.findByIdAndDelete({ _id: id, userId });
        // io.emit('deleteTodo', id)
        if (!result) {
            return res.status(404).send('Todo not found');
        }
        return res.status(200).send('Todo deleted successfully');
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
router.patch('/todos/:todoId/done', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.params;
    const userId = req.headers['userId'];
    try {
        const updatedTodo = yield TodoSchema_1.Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
}));
exports.default = router;
