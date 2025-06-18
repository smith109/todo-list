export default class ProjectManager {
  #currentProject;
  #projects = [];

  get currentProject() {
    return this.#currentProject;
  }

  set currentProject(project) {
    this.#currentProject = project;
  }

  add(project) {
    this.#projects.push(project);
  }

  findAll() {
    return [...this.#projects];
  }
}