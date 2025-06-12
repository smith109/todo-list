const projectContainer = document.querySelector('.project-container');
const todoContainer = document.querySelector('.todo-container');

function createProjectElement(project) {
  const projectElement = document.createElement('li');
  projectElement.textContent = project.name;
  projectElement.dataset.id = project.id;
  return projectElement;
}

function renderProjects(projectArr) {
  projectArr.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectContainer.append(projectElement);
  });
}

function createTodoHeader(todo) {
  const todoHeader = document.createElement('div');
  const checkboxLabel = document.createElement('label');
  const checkboxInput = document.createElement('input');
  const todoTitle = document.createElement('h3');
  const todoDueDate = document.createElement('span');

  todoHeader.classList.add('header');
  checkboxInput.type = 'checkbox';
  todoTitle.textContent = todo.title;
  todoDueDate.textContent = todo.dueDate;

  checkboxLabel.append(checkboxInput);
  todoHeader.append(checkboxLabel, todoTitle, todoDueDate);
  return todoHeader;
}

function createPriorityDiv(todo) {
  const priorityDiv = document.createElement('div');
  priorityDiv.classList.add(`${todo.priority}-priority-text`);
  priorityDiv.textContent = todo.priority;
  return priorityDiv;
}

function createTodoDetails(todo) {
  const todoDetails = document.createElement('div');
  const todoDescription = document.createElement('p');
  const btnContainer = document.createElement('div');
  const editTodoBtn = document.createElement('button');
  const deleteTodoBtn = document.createElement('button');

  todoDetails.classList.add('todo-details');
  btnContainer.classList.add('btn-container');
  todoDescription.textContent = todo.description || 'No description provided.';
  editTodoBtn.textContent = 'Edit';
  deleteTodoBtn.textContent = 'Delete';

  btnContainer.append(editTodoBtn, deleteTodoBtn);
  todoDetails.append(todoDescription, btnContainer);
  return todoDetails;
}

function createTodoElement(todo) {
  const todoElement = document.createElement('div');
  const header = createTodoHeader(todo);
  const priorityDiv = createPriorityDiv(todo);
  const todoDetails = createTodoDetails(todo);

  todoElement.classList.add('todo-card');
  todoElement.dataset.id = todo.id;

  todoElement.append(header, priorityDiv, todoDetails);
  return todoElement;
}

function renderTodos(todoArr) {
  todoArr.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoContainer.append(todoElement);
  });
}

export default {
  renderProjects,
  renderTodos
}