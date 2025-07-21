const projects = [];
let activeProject = null;

const getProjects = () => [...projects];
const getActiveProject = () => activeProject;

const setActiveProject = (project) => {
  activeProject = project;
}

const resetActiveProject = () => {
  activeProject = projects[0] || null;
}

const addProject = (project) => {
  projects.push(project);
}

const removeProject = (project) => {
  const index = projects.indexOf(project);
  projects.splice(index, 1);
}

const findProjectById = (id) => {
  return projects.find((project) => project.getId() === id);
}

export default {
  getProjects,
  getActiveProject,
  setActiveProject,
  resetActiveProject,
  addProject,
  removeProject,
  findProjectById
}