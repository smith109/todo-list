const projectContainer = document.querySelector('.project-container');

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

function createPriorityDiv(todo) {
  const priorityDiv = document.createElement('div');
  const todoPriority = todo.getPriority();

  priorityDiv.classList.add(`${todoPriority}-priority`);
  priorityDiv.textContent =
    `${todoPriority[0].toUpperCase() + todoPriority.slice(1)} Priority`;

  return priorityDiv;
}

export default {
  renderProjects
}