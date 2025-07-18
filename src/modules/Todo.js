export default class Todo {
  #id = crypto.randomUUID();
  #done = false;

  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  getId() {
    return this.#id;
  }

  isDone() {
    return this.#done;
  }

  toggleDone() {
    this.#done = !this.#done;
  }
}