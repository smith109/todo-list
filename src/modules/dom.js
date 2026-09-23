const projectList = document.querySelector('.project-list');

function createProjectItem(project) {
  const projectItem = document.createElement('li');

  projectItem.dataset.id = project.id;
  projectItem.textContent = project.name;
  projectItem.classList.add('project-item');

  return projectItem;
}

export function renderProjectItems(projects = []) {
  projectList.replaceChildren();

  projects.forEach((project) => {
    const projectItem = createProjectItem(project);
    projectList.appendChild(projectItem);
  });
}
