export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export interface IDatabaseState {
  todos: ITodo[];
}

class Database {
  private state: IDatabaseState = {
    todos: [
      {
        id: 1,
        title: 'first todo',
        completed: true,
      },
    ],
  };

  async create(todoData: Omit<ITodo, 'id'>) {
    this.state.todos.push({
      id: this.state.todos.length + 1,
      ...todoData,
    });

    return true;
  }
}

export default new Database();
