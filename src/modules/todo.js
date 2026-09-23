const defaultTodoData = {
  title: 'Untitled',
  description: '',
  dueDate: null,
  priority: '',
  done: false,
};

export class Todo {
  #id = crypto.randomUUID();
  #data = {};

  constructor(data = {}) {
    this.#data = { ...defaultTodoData, ...data };
  }

  get id() {
    return this.#id;
  }

  get data() {
    return { ...this.#data };
  }

  toggle() {
    this.#data.done = !this.#data.done;
  }

  update(newData = {}) {
    this.#data = { ...this.#data, ...newData };
  }
}
