export default class Project {
  #name;
  #todos = [];
  #id = crypto.randomUUID();

  constructor(name = 'Inbox') {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get id() {
    return this.#id;
  }

  add(todo) {
    this.#todos.push(todo);
  }

  remove(id) {
    this.#todos = this.#todos.filter((todo) => todo.id !== id);
  }

  findById(id) {
    return this.#todos.find((todo) => todo.id === id);
  }

  findAll() {
    return [...this.#todos];
  }
}