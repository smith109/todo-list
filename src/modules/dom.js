const projectContainer = document.querySelector('.projects');
const projectForm = document.querySelector('.project-form');

function createProjectElement(project) {
  const projectElement = document.createElement('li');
  projectElement.textContent = project.getName();
  return projectElement;
}

function renderProjects(projectArr) {
  projectContainer.replaceChildren();

  projectArr.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectContainer.append(projectElement);
  });
}

export default {
  projectForm,
  renderProjects
}