const projectContainer = document.querySelector('.project-container');
const todoContainer = document.querySelector('.todo-container');
const projectModal = document.querySelector('.project-modal');

const openProjectModal = () => projectModal.showModal();
const closeProjectModal = () => projectModal.close();

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

function createPriorityText(todo) {
  const priorityText = document.createElement('div');
  const todoPriority = todo.getPriority();

  priorityText.classList.add(`${todoPriority}-priority-text`);
  priorityText.textContent =
    `${todoPriority[0].toUpperCase() + todoPriority.slice(1)} Priority`;

  return priorityText;
}

function createTodoDetails(todo) {
  const todoDetails = document.createElement('div');
  const descriptionPara = document.createElement('p');
  const todoFooter = document.createElement('div');
  const editTodoBtn = document.createElement('button');
  const deleteTodoBtn = document.createElement('button');

  todoDetails.classList.add('todo-details');
  todoFooter.classList.add('footer');

  descriptionPara.textContent =
    todo.getDescription() || 'No description provided.';
  editTodoBtn.textContent = 'Edit';
  deleteTodoBtn.textContent = 'Delete';

  todoFooter.append(editTodoBtn, deleteTodoBtn);
  todoDetails.append(descriptionPara, todoFooter);
  return todoDetails;
}

function createTodoElement(todo) {
  const todoElement = document.createElement('div');
  const todoHeader = createTodoHeader(todo);
  const priorityText = createPriorityText(todo);
  const todoDetails = createTodoDetails(todo);

  todoElement.dataset.id = todo.getId();
  todoElement.classList.add('todo-card');

  todoElement.append(todoHeader, priorityText, todoDetails);
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
  openProjectModal,
  closeProjectModal,
  renderProjects,
  renderTodos
}