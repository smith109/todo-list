const projectList = document.querySelector('.project-list');
const todoCards = document.querySelector('.todo-cards');
const activeProjectEl = document.querySelector('.active-project');
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
  const title = document.createElement('h3');
  const priority = document.createElement('span');
  const dueDate = document.createElement('span');
  const details = document.createElement('div');
  const description = document.createElement('p');
  const btnContainer = document.createElement('div');
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const todoData = todo.data;

  todoCard.dataset.id = todo.id;
  checkboxLabel.htmlFor = 'todo-done';
  checkbox.type = 'checkbox';
  checkbox.name = 'todo-done';
  checkbox.id = 'todo-done';

  todoCard.classList.add('card');
  header.classList.add('header');
  summary.classList.add('summary');
  details.classList.add('details');
  btnContainer.classList.add('btn-container');
  editBtn.classList.add('edit-btn');
  deleteBtn.classList.add('delete-btn');

  title.textContent = todoData.title;
  priority.textContent = todoData.priority;
  dueDate.textContent = todoData.dueDate;
  description.textContent = todoData.description;
  editBtn.textContent = 'Edit';
  deleteBtn.textContent = 'Delete';

  checkboxLabel.append(checkbox);
  summary.append(title, priority);
  header.append(checkboxLabel, summary, dueDate);
  btnContainer.append(editBtn, deleteBtn);
  details.append(description, btnContainer);
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

export { renderProjectItems, renderTodoCards, renderActiveProject };