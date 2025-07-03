const projects = [];
let activeProject = null;

const getAllProjects = () => [...projects];
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

function findById(id) {
  return projects.find((project) => project.id === id);
}

export default {
  getAllProjects,
  getActiveProject,
  setActiveProject,
  addProject,
  removeProject,
  findById
}