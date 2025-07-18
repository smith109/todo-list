const activeProjectName = document.querySelector('.active-project-name');

const renderActiveProjectName = (activeProject) => {
  activeProjectName.textContent = activeProject.name;
}

export default {
  renderActiveProjectName,
}