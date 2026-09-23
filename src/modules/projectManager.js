export class ProjectManager {
  #projects = [];

  get projects() {
    return [...this.#projects];
  }

  add(project) {
    this.#projects.push(project);
  }

  remove(id) {
    this.#projects = this.#projects.filter((project) => project.id !== id);
  }

  find(id) {
    return this.#projects.find((project) => project.id === id);
  }
}
