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

function createTodoElement(todo) {
  const todoElement = document.createElement('div');
  const header = createTodoHeader(todo);

  todoElement.classList.add('todo-card');
  todoElement.dataset.id = todo.id;

  todoElement.append(header);
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