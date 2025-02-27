const projectContainer = document.querySelector('.projects');

function createProjectElement(project) {
  const projectElement = document.createElement('li');
  projectElement.textContent = project.getName();
  return projectElement;
}

function renderProjects(projectArr) {
  projectArr.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectContainer.append(projectElement);
  });
}

export default{
  renderProjects
}