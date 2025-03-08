const projects = [];
let activeProject = '';

const getProjects = () => [...projects];
const getActiveProject = () => activeProject;

function setActiveProject(project) {
  activeProject = project;
}

function addProject(project) {
  projects.push(project);
}

function removeProject(project) {
  const index = projects.indexOf(project);
  projects.splice(index, 1);
}

function findProject(id) {
  return projects.find((project) => project.getId() === id);
}

export default {
  getProjects,
  getActiveProject,
  setActiveProject,
  addProject,
  removeProject,
  findProject
}