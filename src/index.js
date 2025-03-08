import projectManager from "./modules/projectManager";
import createProject from "./modules/createProject";
import dom from "./modules/dom";

const addProjectBtn = document.querySelector('.add-project-btn');
const projectForm = document.querySelector('.project-form');

addProjectBtn.addEventListener('click', dom.openProjectModal);
projectForm.addEventListener('submit', submitProjectForm);

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