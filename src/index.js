import projectManager from "./modules/projectManager";
import createProject from "./modules/createProject";
import dom from "./modules/dom";

const addProjectBtn = document.querySelector('.add-project-btn');
const projectCancelBtn = document.querySelector('.project-form .cancel-btn');
const projectForm = document.querySelector('.project-form');
const projectContainer = document.querySelector('.projects');
const addTodoBtn = document.querySelector('.add-todo-btn');
const todoCancelBtn = document.querySelector('.todo-form .cancel-btn');
const todoForm = document.querySelector('.todo-form');

addProjectBtn.addEventListener('click', dom.openProjectModal);
projectCancelBtn.addEventListener('click', closeProjectForm);
projectForm.addEventListener('submit', submitProjectForm);
projectContainer.addEventListener('click', changeActiveProject);
addTodoBtn.addEventListener('click', dom.openTodoModal);
todoCancelBtn.addEventListener('click', closeTodoForm);

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

function changeActiveProject(e) {
  if (e.target.tagName !== 'LI') return;
  const id = e.target.dataset.id;

  projectManager.setActiveProject(projectManager.findProject(id));
  dom.updateProjectName(projectManager.getActiveProject());
}

function closeProjectForm() {
  projectForm.reset();
  dom.closeProjectModal();
}

function closeTodoForm() {
  todoForm.reset();
  dom.closeTodoModal();
}