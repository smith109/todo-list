import projectManager from "./modules/projectManager";
import createProject from "./modules/createProject";
import dom from "./modules/dom";

dom.projectForm.addEventListener('submit', submitProjectForm);
dom.projectContainer.addEventListener('click', switchActiveProject);

function switchActiveProject(e) {
  const id = e.target.dataset.id;
  const project = projectManager.findProject(id);
  projectManager.setActiveProject(project);
}

function submitProjectForm(e) {
  const projectName = dom.projectForm.elements['project-name'].value;
  const project = createProject(projectName);

  projectManager.addProject(project);
  dom.renderProjects(projectManager.getProjects());

  e.preventDefault();
  dom.projectForm.reset();
}