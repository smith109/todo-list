import projectManager from "./modules/projectManager";
import createProject from "./modules/createProject";
import dom from "./modules/dom";

const addProjectBtn = document.querySelector('.add-project-btn');
const projectForm = document.querySelector('.project-form');
const projectCancelBtn = document.querySelector('.project-form .cancel-btn');
const projectContainer = document.querySelector('.projects');

addProjectBtn.addEventListener('click', dom.openProjectModal);
projectForm.addEventListener('submit', submitProjectForm);
projectCancelBtn.addEventListener('click', closeProjectForm);
projectContainer.addEventListener('click', changeActiveProject);

function submitProjectForm(e) {
  e.preventDefault();
  const formData = projectForm.elements;

  projectManager.addProject(
    createProject(formData['project-name'].value.trim())
  );

  projectForm.reset();
  dom.closeProjectModal();
  dom.renderProjects(projectManager.getProjects());
}

function closeProjectForm() {
  projectForm.reset();
  dom.closeProjectModal();
}

function changeActiveProject(e) {
  if (e.target.tagName !== 'LI') return;
  const id = e.target.dataset.id;
  
  projectManager.setActiveProject(projectManager.findProject(id));
}