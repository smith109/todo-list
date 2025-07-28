export default class Todo {
  #id = crypto.randomUUID();
  #done;

  constructor(title, description, dueDate, priority, done = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.#done = done;
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

  toJSON() {
    return {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      done: this.#done,
    };
  }
}