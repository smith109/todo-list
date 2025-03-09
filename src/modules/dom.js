const projectContainer = document.querySelector('.projects');
const todoContainer = document.querySelector('.todos');
const projectModal = document.querySelector('.project-modal');
const todoModal = document.querySelector('.todo-modal');
const projectNameElement = document.querySelector('.project-name');

const openProjectModal = () => projectModal.showModal();
const closeProjectModal = () => projectModal.close();
const openTodoModal = () => todoModal.showModal();
const closeTodoModal = () => todoModal.close();

function createProjectElement(project) {
  const projectElement = document.createElement('li');
  projectElement.textContent = project.getName();
  projectElement.dataset.id = project.getId();
  return projectElement;
}

function renderProjects(projectArr) {
  projectContainer.replaceChildren();

  projectArr.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectContainer.append(projectElement);
  });
}

function createTodoElement(todo) {
  const todoElement = document.createElement('div');
  const todoHeader = document.createElement('div');
  const checkboxLabel = document.createElement('label');
  const checkboxInput = document.createElement('input');
  const todoTitle = document.createElement('h3');
  const todoPriority = document.createElement('p');
  const todoDueDate = document.createElement('p');
  const todoDetails = document.createElement('div');
  const todoDescription = document.createElement('p');
  const btnContainer = document.createElement('div');
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  todoElement.classList.add('todo-card');
  todoHeader.classList.add('header');
  todoDetails.classList.add('todo-details');
  checkboxInput.type = 'checkbox';

  todoTitle.textContent = todo.getTitle();
  todoPriority.textContent = todo.getPriority();
  todoDueDate.textContent = todo.getDueDate();
  todoDescription.textContent = todo.getDescription();
  editBtn.textContent = 'Edit';
  deleteBtn.textContent = 'Delete';

  checkboxLabel.append(checkboxInput);
  btnContainer.append(editBtn, deleteBtn);
  todoHeader.append(checkboxLabel, todoTitle, todoPriority, todoDueDate);
  todoDetails.append(todoDescription, btnContainer);
  todoElement.append(todoHeader, todoDetails);
  return todoElement;
}

function renderTodos(todoArr) {
  todoArr.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoContainer.append(todoElement);
  });
}

function updateProjectName(project) {
  projectNameElement.textContent = project.getName();
}

export default {
  openProjectModal,
  closeProjectModal,
  openTodoModal,
  closeTodoModal,
  renderProjects,
  renderTodos,
  updateProjectName
}