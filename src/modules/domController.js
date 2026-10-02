import { ProjectManager } from './projectManager.js';
import { Project } from './project.js';
import { Todo } from './todo.js';
import * as dom from './dom.js';
import '../css/styles.css';

const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');
const projectForm = document.querySelector('.project-form');
const addTodoBtn = document.querySelector('.add-todo-btn');
const todoModal = document.querySelector('.todo-modal');
const todoForm = document.querySelector('.todo-form');
const projectList = document.querySelector('.project-list');
const todoCards = document.querySelector('.todo-cards');
const projectManager = new ProjectManager();
let activeProject = null;

addProjectBtn.addEventListener('click', showDialogElement);
projectModal.addEventListener('click', closeDialogElement);
projectForm.addEventListener('submit', submitProjectForm);
addTodoBtn.addEventListener('click', showDialogElement);
todoModal.addEventListener('click', closeDialogElement);
todoForm.addEventListener('submit', submitTodoForm);
projectList.addEventListener('click', handleProjectClick);
todoCards.addEventListener('click', handleTodoClick);

const getActiveProject = () => activeProject;

function setActiveProject(project) {
  if (!project) return;
  activeProject = projectManager.find(project.id);
}

function resetActiveProject() {
  const projects = projectManager.projects;
  setActiveProject(projects[0]);
}

function addProject(name) {
  const project = new Project(name);
  projectManager.add(project);
}

function removeProject(projectToRemove) {
  projectManager.remove(projectToRemove.id);

  if (projectToRemove === getActiveProject()) {
    resetActiveProject();
  }
}

function addTodo(todoData = {}) {
  const activeProject = getActiveProject();
  const todo = new Todo(todoData);
  activeProject.add(todo);
}

function removeTodo(todoToRemove){
  const activeProject = getActiveProject();
  activeProject.remove(todoToRemove.id);
  updateDisplay();
}

function toggleTodoDone(todo) {
  todo.toggle();
  dom.toggleDoneClass(todo);
}

function submitProjectForm() {
  const inputs = projectForm.elements;
  const projectName = inputs['project-name'].value.trim();

  addProject(projectName);
  projectForm.reset();
  updateDisplay();
}

function submitTodoForm() {
  const inputs = todoForm.elements;
  const title = inputs['todo-title'].value.trim();
  const description = inputs['todo-description'].value.trim();
  const dueDate = inputs['todo-due-date'].value;
  const priority = inputs['todo-priority'].value;
  const todoData = { title, description, dueDate, priority };

  addTodo(todoData);
  todoForm.reset();
  updateDisplay();
}

function showDialogElement(e) {
  const selectedButton = getSelectedBtn(e)

  const modalBtns = {
    projectModalBtn: () => projectModal.showModal(),
    todoModalBtn: () => todoModal.showModal(),
  };

  if (selectedButton) {
    modalBtns[selectedButton]();
  }
}

function closeDialogElement(e) {
  if (!e.target.classList.contains('close-btn')) return;
  const dialog = e.target.closest('dialog');
  const form = e.target.closest('form');

  dialog.close();
  form.reset();
}

function getSelectedBtn(e) {
  const button = e.target.closest('button');
  const selectedButton = button.dataset.modalBtn;
  return selectedButton;
}

function handleProjectClick(e) {
  const projectElement = e.target.closest('[data-id]');
  const projectId = projectElement?.dataset.id;
  const project = projectManager.find(projectId);

  if (e.target.classList.contains('delete-btn')) {
    removeProject(project);
  } else {
    setActiveProject(project);
  }

  updateDisplay();
}

function handleTodoClick(e) {
  const todoCard = e.target.closest('.card');
  const todoId = todoCard?.dataset.id;
  const todo = activeProject.find(todoId);
  const selectedEl = e.target.closest('[data-action]');
  const action = selectedEl?.dataset.action;

  const todoActions = {
    expand: () => dom.toggleDetailsElement(todo),
    toggle: () => toggleTodoDone(todo),
    delete: () => removeTodo(todo),
  };

  if (action) {
    todoActions[action]();
  }
}

function updateDisplay() {
  const projects = projectManager.projects;
  const activeProject = getActiveProject();

  dom.renderProjectItems(projects);

  if (activeProject) {
    const todos = activeProject.todos;
    dom.renderTodoCards(todos);
    dom.renderActiveProject(activeProject);
  }
}

function loadApp() {
  const inbox = Project.createProtectedProject('Inbox');
  projectManager.add(inbox);
  resetActiveProject();
  updateDisplay();
}

export { loadApp };
