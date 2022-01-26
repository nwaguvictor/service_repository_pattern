import Database, { ITodo } from './Database';

export class TodoRepository {
  private readonly _db = Database;

  async save(title: ITodo['title']) {
    return await this._db.create({
      title,
      completed: false,
    });
  }
}

export class TodoService {
  constructor(private readonly _todoRepo: TodoRepository) {}

  async createTodo(title: ITodo['title']) {
    if (title.length < 6) {
      throw new Error('Title must have at least 6 characters');
    }

    return this._todoRepo.save(title);
  }
}

export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  async store(todoData: string) {
    return await this._todoService.createTodo(todoData);
  }
}

const repository = new TodoRepository();
const service = new TodoService(repository);
const controller = new TodoController(service);

controller.store('A new Todo').then(console.log);
