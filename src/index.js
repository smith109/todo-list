import projectManager from './modules/projectManager';
import Project from './modules/Project';
import dom from './modules/dom';
import './styles.css';

const projectContainer = document.querySelector('.project-container');
const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');
const projectForm = document.querySelector('.project-form');
const addTodoBtn = document.querySelector('.add-todo-btn');
const todoModal = document.querySelector('.todo-modal');

const updateDisplay = () => {
  const projects = projectManager.getProjects();
  const activeProject = projectManager.getActiveProject();

  dom.renderProjects(projects);
  dom.renderActiveProjectName(activeProject);

  if (activeProject) {
    const todos = activeProject.getTodos();
    dom.renderTodos(todos);
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

projectContainer.addEventListener('click', handleProjectClick);
addProjectBtn.addEventListener('click', showDialogElement);
projectModal.addEventListener('click', closeDialogElement);
projectForm.addEventListener('submit', submitProjectForm);
addTodoBtn.addEventListener('click', showDialogElement);
todoModal.addEventListener('click', closeDialogElement);