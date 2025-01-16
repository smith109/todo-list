const renderProjects = (projects) => {
  const projectList = document.querySelector('.project-list');
  projectList.replaceChildren();

  projects.forEach((project) => {
    const projectEl = document.createElement('li');
    projectEl.textContent = project.getTitle();
    projectList.append(projectEl);
  });
}

export default {
  renderProjects
}