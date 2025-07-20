import projectManager from './modules/projectManager';
import Project from './modules/Project';
import dom from './modules/dom';

const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');
const projectForm = document.querySelector('.project-form');
const addTodoBtn = document.querySelector('.add-todo-btn');
const todoModal = document.querySelector('.todo-modal');

const updateDisplay = () => {
  const projects = projectManager.getProjects();
  const activeProject = projectManager.getActiveProject();

  if (activeProject) {
    const todos = activeProject.getTodos();
    dom.renderActiveProjectName(activeProject);
    dom.renderTodos(todos);
  }

  dom.renderProjects(projects);
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

addProjectBtn.addEventListener('click', showDialogElement);
projectModal.addEventListener('click', closeDialogElement);
projectForm.addEventListener('submit', submitProjectForm);
addTodoBtn.addEventListener('click', showDialogElement);
todoModal.addEventListener('click', closeDialogElement);