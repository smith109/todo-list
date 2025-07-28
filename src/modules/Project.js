export default class Project {
  #id = crypto.randomUUID();
  #todos = [];

  constructor(name = 'Inbox') {
    this.name = name;
  }

  getId() {
    return this.#id;
  }

  getTodos() {
    return [...this.#todos];
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  removeTodo(id) {
    this.#todos = this.#todos.filter((todo) => todo.getId() !== id);
  }

  findTodoById(id) {
    return this.#todos.find((todo) => todo.getId() === id);
  }

  updateTodo(id, newDetails = {}) {
    const todoToEdit = this.findTodoById(id);
    Object.assign(todoToEdit, newDetails);
  }

  toJSON() {
    return {
      name: this.name,
      todos: this.#todos
    };
  }
}