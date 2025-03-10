import projectManager from "./modules/projectManager";
import createProject from "./modules/createProject";
import createTodo from "./modules/createTodo";
import dom from "./modules/dom";
import './style.css';

const addProjectBtn = document.querySelector('.add-project-btn');
const projectCancelBtn = document.querySelector('.project-form .cancel-btn');
const projectForm = document.querySelector('.project-form');
const projectContainer = document.querySelector('.projects');
const addTodoBtn = document.querySelector('.add-todo-btn');
const todoCancelBtn = document.querySelector('.todo-form .cancel-btn');
const todoForm = document.querySelector('.todo-form');

addProjectBtn.addEventListener('click', dom.openProjectModal);
projectCancelBtn.addEventListener('click', closeProjectModal);
projectForm.addEventListener('submit', submitProjectForm);
projectContainer.addEventListener('click', changeActiveProject);
addTodoBtn.addEventListener('click', openTodoModal);
todoCancelBtn.addEventListener('click', closeTodoModal);
todoForm.addEventListener('submit', submitTodoForm);

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

function submitTodoForm(e) {
  e.preventDefault();
  const formData = todoForm.elements;

  const todo = createTodo(
    formData['todo-title'].value,
    formData['todo-description'].value,
    formData['todo-due-date'].value,
    formData['todo-priority'].value
  );

  todoForm.reset();
  dom.closeTodoModal();
  projectManager.getActiveProject().addTodo(todo);
  dom.renderTodos(projectManager.getActiveProject().getTodos());
}

function changeActiveProject(e) {
  if (e.target.tagName !== 'LI') return;
  const id = e.target.dataset.id;

  projectManager.setActiveProject(projectManager.findProject(id));
  dom.updateProjectName(projectManager.getActiveProject());
  dom.renderTodos(projectManager.getActiveProject().getTodos());
}

function openTodoModal() {
  if (!projectManager.getActiveProject()) {
    alert('Please select a project');
  } else {
    dom.openTodoModal();
  }
}

function closeProjectModal() {
  projectForm.reset();
  dom.closeProjectModal();
}

function closeTodoModal() {
  todoForm.reset();
  dom.closeTodoModal();
}