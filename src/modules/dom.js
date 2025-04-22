const projectContainer = document.querySelector('.project-container');
const todoContainer = document.querySelector('.todo-container');

function createProjectElement(project) {
  const projectElement = document.createElement('li');
  const projectNameSpan = document.createElement('span');
  const deleteProjectBtn = document.createElement('button');

  projectElement.dataset.id = project.getId();
  projectNameSpan.textContent = project.getName();

  projectElement.append(projectNameSpan, deleteProjectBtn);
  return projectElement;
}

function renderProjects(projectArr) {
  projectContainer.replaceChildren();

  projectArr.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectContainer.append(projectElement);
  });
}

function createTodoHeader(todo) {
  const todoHeader = document.createElement('div');
  const checkboxLabel = document.createElement('label');
  const checkboxInput = document.createElement('input');
  const todoTitleH3 = document.createElement('h3');
  const dueDateSpan = document.createElement('span');

  todoHeader.classList.add('header');
  checkboxInput.type = 'checkbox';

  todoTitleH3.textContent = todo.getTitle();
  dueDateSpan.textContent = todo.getDueDate();

  checkboxLabel.append(checkboxInput);
  todoHeader.append(checkboxLabel, todoTitleH3, dueDateSpan);
  return todoHeader;
}

function createTodoElement(todo) {
  const todoElement = document.createElement('div');
  const todoHeader = createTodoHeader(todo);

  todoElement.dataset.id = todo.getId();
  todoElement.classList.add('todo-card');

  todoElement.append(todoHeader);
  return todoElement;
}

function renderTodos(todoArr) {
  todoContainer.replaceChildren();

  todoArr.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoContainer.append(todoElement);
  });
}

export default {
  renderProjects,
  renderTodos
}