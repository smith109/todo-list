import projectManager from "./modules/projectManager";
import createProject from "./modules/createProject";
import dom from "./modules/dom";

const projectForm = document.querySelector('.project-form');

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