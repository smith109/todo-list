import { format } from "date-fns";

export default class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #done = false;

  constructor(title, description, dueDate, priority) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = format(dueDate, 'MMM do, yyyy');
    this.#priority = priority;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get dueDate() {
    return this.#dueDate;
  }

  get priority() {
    return this.#priority;
  }

  get done() {
    return this.#done;
  }

  toggle() {
    this.#done = !this.#done;
  }
}