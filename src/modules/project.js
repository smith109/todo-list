export class Project {
  #id = crypto.randomUUID();
  #todos = [];

  constructor(name = 'Inbox') {
    this.name = name;
  }

  get id() {
    return this.#id;
  }

  get todos() {
    return [...this.#todos];
  }

  add(todo) {
    this.#todos.push(todo);
  }

  remove(id) {
    this.#todos = this.#todos.filter((todo) => todo.id !== id);
  }

  find(id) {
    return this.#todos.find((todo) => todo.id === id);
  }
}
