import projectManager from './modules/projectManager';
import dom from './modules/dom';

const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');
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
  if (e.target.classList.contains('add-project-btn')) {
    projectModal.showModal();
  }
  if (e.target.classList.contains('add-todo-btn')) {
    todoModal.showModal();
  }
}

function closeDialogElement(e) {
  if (!e.target.classList.contains('cancel-btn')) return;
  const dialog = e.target.closest('dialog');
  const form = e.target.closest('form');

  dialog.close();
  form.reset();
}

addProjectBtn.addEventListener('click', showDialogElement);
projectModal.addEventListener('click', closeDialogElement);
addTodoBtn.addEventListener('click', showDialogElement);
todoModal.addEventListener('click', closeDialogElement);