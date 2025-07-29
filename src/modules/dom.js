import { format } from 'date-fns';

const activeProjectName = document.querySelector('.active-project-name');
const projectContainer = document.querySelector('.project-container');
const todoContainer = document.querySelector('.todo-container');
const todoForm = document.querySelector('.todo-form');

const getFormattedDate = (todo) => {
  return todo.dueDate ?
    format(todo.dueDate.replace('-', '/'), 'MM/dd/yyyy') : '';
}

const renderActiveProjectName = (activeProject) => {
  if (activeProject) {
    activeProjectName.textContent = activeProject.name;
  } else {
    activeProjectName.textContent = 'Todos';
  }
}

const highlightActiveProject = (activeProject) => {
  const id = activeProject.getId();
  const currentActiveElement = document.querySelector('.active');
  const newActiveElement = document.querySelector(`[data-id='${id}']`);

  if (currentActiveElement) {
    currentActiveElement.classList.remove('active');
  }

  newActiveElement.classList.add('active');
}

const findMatchingClassKey = (event, validClasses) => {
  return Object.keys(validClasses)
    .find((className) => event.target.classList.contains(className));
}

const renderTodoFormTitle = (newTitle) => {
  const todoFormH2 = document.querySelector('.todo-form h2');
  todoFormH2.textContent = newTitle;
}

const toggleTodoDoneClass = (todoId, todo) => {
  const todoElement = document.querySelector(`[data-id='${todoId}']`);
  const isDone = todo.isDone();

  if (isDone) {
    todoElement.classList.add('done');
  } else {
    todoElement.classList.remove('done');
  }
}

const setHiddenTodoInput = (todoId) => {
  todoForm['todoId'].value = todoId;
}

const hideAllTodoDetails = () => {
  const allTodoDetails = document.querySelectorAll('.details');

  allTodoDetails.forEach((element) => {
    element.classList.add('hidden');
  });
}

const toggleTodoDetails = (todoId) => {
  const todoDetails = document.querySelector(`[data-id='${todoId}'] .details`);
  const isHidden = todoDetails.classList.contains('hidden');

  hideAllTodoDetails();

  if (isHidden) {
    todoDetails.classList.remove('hidden');
  }
}

const populateTodoForm = (todo) => {
  todoForm['todo-title'].value = todo.title;
  todoForm['todo-description'].value = todo.description;
  todoForm['todo-due-date'].value = todo.dueDate;
  todoForm['todo-priority'].value = todo.priority;
}

const createProjectElement = (project, index) => {
  const projectElement = document.createElement('li');
  const projectNameSpan = document.createElement('span');

  projectElement.dataset.id = project.getId();
  projectNameSpan.textContent = project.name;
  projectElement.append(projectNameSpan);

  if (index !== 0) {
    const deleteBtn = document.createElement('button');
    projectElement.append(deleteBtn);
  }

  return projectElement;
}

const renderProjects = (projectArr) => {
  projectContainer.replaceChildren();

  projectArr.forEach((project, index) => {
    const projectElement = createProjectElement(project, index);
    projectContainer.append(projectElement);
  });
}

const createTodoHeader = (todo) => {
  const header = document.createElement('div');
  const checkboxLabel = document.createElement('label');
  const checkboxInput = document.createElement('input');
  const todoSummaryDiv = document.createElement('div');
  const titleH3 = document.createElement('h3');
  const prioritySpan = document.createElement('span');
  const dueDateSpan = document.createElement('span');
  const formattedDate = getFormattedDate(todo);

  header.classList.add('header');
  checkboxInput.classList.add('todo-checkbox');
  todoSummaryDiv.classList.add('todo-summary');
  prioritySpan.classList.add(`${todo.priority}-priority-text`);

  checkboxInput.setAttribute('type', 'checkbox');
  checkboxInput.setAttribute('name', 'todo-done');

  titleH3.textContent = todo.title;
  prioritySpan.textContent = `${todo.priority} Priority`;
  dueDateSpan.textContent = todo.dueDate ? `Due: ${formattedDate}` : '';

  checkboxLabel.append(checkboxInput);
  todoSummaryDiv.append(titleH3, prioritySpan);
  header.append(checkboxLabel, todoSummaryDiv, dueDateSpan);
  return header;
}

const createTodoDetails = (todo) => {
  const todoDetails = document.createElement('div');
  const descriptionPara = document.createElement('p');
  const btnContainer = document.createElement('div');
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  todoDetails.classList.add('details', 'hidden');
  editBtn.classList.add('edit-todo-btn');
  deleteBtn.classList.add('delete-todo-btn');

  descriptionPara.textContent = todo.description || 'No description provided.';
  editBtn.textContent = 'Edit';
  deleteBtn.textContent = 'Delete';

  btnContainer.append(editBtn, deleteBtn);
  todoDetails.append(descriptionPara, btnContainer);
  return todoDetails;
}

const resetTodoCardState = (todoElement) => {
  todoElement.classList.add('done');
  todoElement.querySelector('.todo-checkbox').checked = true;
}

const createTodoElement = (todo) => {
  const todoElement = document.createElement('div');
  const header = createTodoHeader(todo);
  const details = createTodoDetails(todo);
  const isDone = todo.isDone();

  todoElement.dataset.id = todo.getId();
  todoElement.classList.add('todo-card');

  todoElement.append(header, details);

  if (isDone) {
    resetTodoCardState(todoElement);
  }

  return todoElement;
}

const renderTodos = (todoArr) => {
  todoContainer.replaceChildren();

  todoArr.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoContainer.append(todoElement);
  });
}

export default {
  renderActiveProjectName,
  highlightActiveProject,
  findMatchingClassKey,
  renderTodoFormTitle,
  toggleTodoDoneClass,
  setHiddenTodoInput,
  toggleTodoDetails,
  populateTodoForm,
  renderProjects,
  renderTodos
};