const defaultTodoData = {
  title: 'Untitled',
  description: '',
  dueDate: null,
  priority: 'low',
};

export class Todo {
  #id = crypto.randomUUID();
  #done = false;
  #data = {};

  constructor(data = {}) {
    this.#data = { ...defaultTodoData, ...data };
  }

  get id() {
    return this.#id;
  }

  get done() {
    return this.#done;
  }

  get data() {
    return this.#data;
  }

  toggleDone() {
    this.#done = !this.#done;
  }

  update(newData = {}) {
    this.#data = { ...this.#data, ...newData };
  }
}
