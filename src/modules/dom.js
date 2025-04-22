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

function createTodoElement(todo) {
  const todoElement = document.createElement('div');

  todoElement.dataset.id = todo.getId();
  todoElement.classList.add('todo-card');
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