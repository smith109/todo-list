export default class Project {
  #id = crypto.randomUUID();
  #todos = [];

  constructor(name = 'Inbox') {
    this.name = name;
  }

  get id() {
    return this.#id;
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  removeTodo(id) {
    this.#todos = this.#todos.filter((todo) => todo.id !== id);
  }

  findById(id) {
    return this.#todos.find((todo) => todo.id === id);
  }

  updateTodo(id, updatedTodo) {
    Object.assign(this.findById(id), updatedTodo);
  }

  getAllTodos() {
    return [...this.#todos];
  }
}