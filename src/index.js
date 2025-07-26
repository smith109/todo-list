import projectManager from './modules/projectManager';
import Project from './modules/Project';
import Todo from './modules/Todo';
import dom from './modules/dom';
import './styles.css';

const projectContainer = document.querySelector('.project-container');
const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');
const projectForm = document.querySelector('.project-form');
const todoContainer = document.querySelector('.todo-container');
const addTodoBtn = document.querySelector('.add-todo-btn');
const todoModal = document.querySelector('.todo-modal');
const todoForm = document.querySelector('.todo-form');

const updateDisplay = () => {
  const projects = projectManager.getProjects();
  const activeProject = projectManager.getActiveProject();

  dom.renderProjects(projects);
  dom.renderActiveProjectName(activeProject);

  if (activeProject) {
    const todos = activeProject.getTodos();
    dom.renderTodos(todos);
    dom.highlightActiveProject(activeProject);
  }
}

const removeProject = (selectedProject) => {
  const activeProject = projectManager.getActiveProject();
  const isActive = (selectedProject === activeProject);

  projectManager.removeProject(selectedProject);

  if (isActive) {
    projectManager.resetActiveProject();
  }
}

const showDialogElement = (e) => {
  const modalButtons = {
    'add-project-btn': () => projectModal.showModal(),
    'add-todo-btn': () => todoModal.showModal(),
  }

  const targetClassList = e.target.classList;

  for (const className in modalButtons) {
    if (targetClassList.contains(className)) {
      modalButtons[className]();
    }
  }
}

function closeDialogElement(e) {
  if (!e.target.classList.contains('cancel-btn')) return;
  const dialog = e.target.closest('dialog');
  const form = e.target.closest('form');

  dialog.close();
  form.reset();
}

const submitProjectForm = () => {
  const projectName = projectForm['project-name'].value.trim();

  if (projectName !== '') {
    const project = new Project(projectName);
    projectManager.addProject(project);
    updateDisplay();
  }

  projectForm.reset();
}

const submitTodoForm = () => {
  const todoTitle = todoForm['todo-title'].value.trim();
  const todoDescription = todoForm['todo-description'].value.trim();
  const todoDueDate = todoForm['todo-due-date'].value;
  const todoPriority = todoForm['todo-priority'].value;
  const activeProject = projectManager.getActiveProject();

  if (!activeProject) {
    alert('Please select a project before adding a Todo.');
    return;
  }

  if (todoTitle !== '') {
    const todo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority);
    activeProject.addTodo(todo);
    updateDisplay();
  }

  todoForm.reset();
}

const handleProjectClick = (e) => {
  if (e.target.tagName === 'UL') return;
  const projectId = e.target.closest('[data-id]').dataset.id;
  const selectedProject = projectManager.findProjectById(projectId);

  if (e.target.tagName === 'BUTTON') {
    removeProject(selectedProject);
  } else {
    projectManager.setActiveProject(selectedProject);
  }

  updateDisplay();
}

const handleTodoClick = (e) => {
  if (e.target.classList.contains('todo-container')) return;
  const todoCard = e.target.closest('.todo-card');
  const todoId = todoCard.dataset.id;

  dom.toggleTodoDetails(todoId);
}

projectContainer.addEventListener('click', handleProjectClick);
addProjectBtn.addEventListener('click', showDialogElement);
projectModal.addEventListener('click', closeDialogElement);
projectForm.addEventListener('submit', submitProjectForm);
todoContainer.addEventListener('click', handleTodoClick);
addTodoBtn.addEventListener('click', showDialogElement);
todoModal.addEventListener('click', closeDialogElement);
todoForm.addEventListener('submit', submitTodoForm);