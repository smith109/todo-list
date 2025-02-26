const projects = [];

const getProjects = () => [...projects];

function addProject(project) {
  projects.push(project);
}

function removeProject(project) {
  const index = projects.indexOf(project);
  projects.splice(index, 1);
}

function findProject(name) {
  return projects.find((project) => project.getName() === name);
}

export default {
  getProjects,
  addProject,
  removeProject,
  findProject
};