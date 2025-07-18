const activeProjectName = document.querySelector('.active-project-name');
const projectContainer = document.querySelector('.project-container');

const renderActiveProjectName = (activeProject) => {
  activeProjectName.textContent = activeProject.name;
}

const createProjectElement = (project) => {
  const projectElement = document.createElement('li');
  const projectNameSpan = document.createElement('span');
  const deleteBtn = document.createElement('button');

  projectElement.dataset.id = project.getId();
  projectNameSpan.textContent = project.name;

  projectElement.append(projectNameSpan, deleteBtn);
  return projectElement;
}

const renderProjects = (projectArr) => {
  projectContainer.replaceChildren();

  projectArr.forEach((project) => {
    const projectElement = createProjectElement(project);
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

  header.classList.add('header');
  todoSummaryDiv.classList.add('todo-summary');
  prioritySpan.classList.add(`${todo.priority}-priority-text`);

  checkboxInput.setAttribute('type', 'checkbox');
  checkboxInput.setAttribute('name', 'todo-done');

  titleH3.textContent = todo.title;
  prioritySpan.textContent = `${todo.priority} Priority`;
  dueDateSpan.textContent = todo.dueDate ? `Due: ${todo.dueDate}` : '';

  checkboxLabel.append(checkboxInput);
  todoSummaryDiv.append(titleH3, prioritySpan);
  header.append(checkboxLabel, todoSummaryDiv, dueDateSpan);
  return header;
}

export default {
  renderActiveProjectName,
  renderProjects,
}