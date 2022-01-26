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
exports.TodoController = exports.TodoService = exports.TodoRepository = void 0;
const Database_1 = __importDefault(require("./Database"));
class TodoRepository {
    constructor() {
        this._db = Database_1.default;
    }
    save(title) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._db.create({
                title,
                completed: false,
            });
        });
    }
}
exports.TodoRepository = TodoRepository;
class TodoService {
    constructor(_todoRepo) {
        this._todoRepo = _todoRepo;
    }
    createTodo(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title.length < 6) {
                throw new Error('Title must have at least 6 characters');
            }
            return this._todoRepo.save(title);
        });
    }
}
exports.TodoService = TodoService;
class TodoController {
    constructor(_todoService) {
        this._todoService = _todoService;
    }
    store(todoData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._todoService.createTodo(todoData);
        });
    }
}
exports.TodoController = TodoController;
const repository = new TodoRepository();
const service = new TodoService(repository);
const controller = new TodoController(service);
controller.store('A new Todo').then(console.log);
