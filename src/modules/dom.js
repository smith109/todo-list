const projectList = document.querySelector('.project-list');
const todoCards = document.querySelector('.todo-cards');
const activeProjectEl = document.querySelector('.active-project');
import { format, parseISO } from 'date-fns';
import '../css/main-content.css';
import '../css/sidebar.css';

function createProjectItem(project) {
  const projectItem = document.createElement('li');
  const name = document.createElement('span');
  const isRemovable = project.removable;

  projectItem.dataset.id = project.id;
  projectItem.classList.add('project-item');

  name.textContent = project.name;
  projectItem.append(name);

  if (isRemovable) {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    projectItem.append(deleteBtn);
  }

  return projectItem;
}

function renderProjectItems(projects = []) {
  projectList.replaceChildren();

  projects.forEach((project) => {
    const projectItem = createProjectItem(project);
    projectList.append(projectItem);
  });
}

function createTodoCard(todo) {
  const todoCard = document.createElement('div');
  const header = document.createElement('div');
  const checkboxLabel = document.createElement('label');
  const checkbox = document.createElement('input');
  const summary = document.createElement('div');
  const titleEl = document.createElement('h3');
  const priorityEl = document.createElement('span');
  const dueDateEl = document.createElement('span');
  const details = document.createElement('div');
  const descriptionEl = document.createElement('p');
  const btnContainer = document.createElement('div');
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const { id, data } = todo;
  const { title, description, dueDate, priority, done } = data;

  if (priority) {
    priorityEl.classList.add(`${priority}-priority`);
    priorityEl.textContent = `${priority} Priority`;
  } 

  if (dueDate) {
    dueDateEl.textContent = 
      `Due: ${format(parseISO(dueDate), 'MMM do, yyyy')}`;
  }

  if (done) {
    todoCard.classList.add('done');
    checkbox.checked = true;
  }

  todoCard.dataset.id = id;
  todoCard.dataset.action = 'expand';
  checkbox.dataset.action = 'toggle';
  editBtn.dataset.action = 'edit';
  deleteBtn.dataset.action = 'delete';

  checkbox.type = 'checkbox';
  checkbox.name = 'todo-done';

  todoCard.classList.add('card');
  header.classList.add('header');
  summary.classList.add('summary');
  details.classList.add('details', 'hidden');
  btnContainer.classList.add('btn-container');
  editBtn.classList.add('edit-btn');
  deleteBtn.classList.add('delete-btn');

  titleEl.textContent = title;
  descriptionEl.textContent = description || 'No description.';
  editBtn.textContent = 'Edit';
  deleteBtn.textContent = 'Delete';

  checkboxLabel.append(checkbox);
  summary.append(titleEl, priorityEl);
  header.append(checkboxLabel, summary, dueDateEl);
  btnContainer.append(editBtn, deleteBtn);
  details.append(descriptionEl, btnContainer);
  todoCard.append(header, details);

  return todoCard;
}

function renderTodoCards(todos = []) {
  todoCards.replaceChildren();

  todos.forEach((todo) => {
    const card = createTodoCard(todo);
    todoCards.append(card);
  });
}

function setActiveProject(project) {
  const activeProject = document.querySelector('.active');
  const projectItem = document.querySelector(`[data-id='${project.id}']`);

  activeProject?.classList.remove('.active');
  projectItem?.classList.add('active');
}

function renderActiveProject(project) {
  activeProjectEl.textContent = project.name;
  setActiveProject(project);
}

function renderTodoFormTitle(title) {
  const todoForm = document.querySelector('.todo-form');
  const formTitle = todoForm.querySelector('h2');
  formTitle.textContent = title;
}

function toggleDetailsElement(todo) {
  const card = document.querySelector(`[data-id='${todo.id}']`);
  const details = card.querySelector('.details');
  details.classList.toggle('hidden');
}

function toggleDoneClass(todo) {
  const card = document.querySelector(`[data-id='${todo.id}']`);
  card.classList.toggle('done');
}

function populateTodoForm(todo) {
  const { id, data } = todo;
  const { title, description, dueDate, priority } = data;
  const todoForm = document.querySelector('.todo-form');
  const inputs = todoForm.elements;

  inputs['todoId'].value = id;
  inputs['todo-title'].value = title;
  inputs['todo-description'].value = description;
  inputs['todo-due-date'].value = dueDate;
  inputs['todo-priority'].value = priority;
}

export { 
  renderProjectItems, 
  renderTodoCards, 
  renderActiveProject,
  renderTodoFormTitle,
  toggleDetailsElement,
  toggleDoneClass,
  populateTodoForm,
};