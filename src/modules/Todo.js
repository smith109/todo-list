import { format } from "date-fns";

export default class Todo {
  #id = crypto.randomUUID();
  #done = false;
  #dueDate;

  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.#dueDate = format(dueDate, 'MMM do, yyyy');
    this.priority = priority;
  }

  get id() {
    return this.#id;
  }

  get done() {
    return this.#done;
  }

  get dueDate() {
    return this.#dueDate;
  }

  set dueDate(newDate) {
    this.#dueDate = format(newDate, 'MMM do, yyyy');
  }

  toggle() {
    this.#done = !this.#done;
  }
}