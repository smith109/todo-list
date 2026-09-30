import { renderProjectItems, renderTodoCards } from './dom.js';
import { ProjectManager } from './projectManager.js';
import { Project } from './project.js';
import { Todo } from './todo.js';
import '../css/styles.css';

const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');
const projectForm = document.querySelector('.project-form');
const addTodoBtn = document.querySelector('.add-todo-btn');
const todoModal = document.querySelector('.todo-modal');
const todoForm = document.querySelector('.todo-form');
const projectManager = new ProjectManager();
let activeProject = null;

addProjectBtn.addEventListener('click', showDialogElement);
projectForm.addEventListener('submit', submitProjectForm);
addTodoBtn.addEventListener('click', showDialogElement);
todoForm.addEventListener('submit', submitTodoForm);

const getActiveProject = () => activeProject;

function setActiveProject(projectId) {
  if (!projectId) return;
  activeProject = projectManager.find(projectId);
}

function addProject(name) {
  const project = new Project(name);
  projectManager.add(project);
}

function addTodo(todoData = {}) {
  const activeProject = getActiveProject();
  const todo = new Todo(todoData);
  activeProject.add(todo);
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

function getSelectedBtn(e) {
  const button = e.target.closest('button');
  const selectedButton = button.dataset.modalBtn;
  return selectedButton;
}

function updateDisplay() {
  const projects = projectManager.projects;
  const activeProject = getActiveProject();

  if (activeProject) {
    const todos = activeProject.todos;
    renderTodoCards(todos);
  }

  renderProjectItems(projects);
}
