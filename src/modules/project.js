export class Project {
  #id = crypto.randomUUID();
  #removable = true;
  #todos = [];

  constructor(name = 'Untitled', isRemovable = true) {
    this.name = name;
    this.#removable = isRemovable;
  }

  get id() {
    return this.#id;
  }

  get removable() {
    return this.#removable;
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

  static createProtectedProject(name) {
    return new Project(name, false);
  }
}
