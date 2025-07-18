const activeProjectName = document.querySelector('.active-project-name');
const projectContainer = document.querySelector('.project-container');

const renderActiveProjectName = (activeProject) => {
  activeProjectName.textContent = activeProject.name;
}

const createProjectElement = (project) => {
  const projectElement = document.createElement('li');
  const projectNameSpan = document.createElement('span');
  const deleteBtn = document.createElement('button');

  projectElement.dataset.id = project.getId();
  projectNameSpan.textContent = project.name;

  projectElement.append(projectNameSpan, deleteBtn);
  return projectElement;
}

const renderProjects = (projectArr) => {
  projectContainer.replaceChildren();

  projectArr.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectContainer.append(projectElement);
  });
}

export default {
  renderActiveProjectName,
  renderProjects,
}