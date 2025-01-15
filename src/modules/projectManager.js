const projects = [];
let activeProject = '';

const getProjects = () => [...projects];
const getActiveProject = () => activeProject;

const setActiveProject = (project) => {
  activeProject = project;
}

const addProject = (project) => {
  projects.push(project);
}

const removeProject = (project) => {
  const index = projects.indexOf(project);
  projects.splice(index, 1);

  if (project === activeProject) {
    activeProject = projects.length > 0 ? projects[0] : '';
  }
}

export default {
  getProjects,
  getActiveProject,
  setActiveProject,
  addProject,
  removeProject
};