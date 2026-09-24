const projectList = document.querySelector('.project-list');
const todoCards = document.querySelector('.todo-cards');

function createProjectItem(project) {
  const projectItem = document.createElement('li');

  projectItem.dataset.id = project.id;
  projectItem.textContent = project.name;
  projectItem.classList.add('project-item');

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

export { renderProjectItems, renderTodoCards };