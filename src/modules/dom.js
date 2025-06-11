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

function createTodoElement(todo) {
  const todoElement = document.createElement('div');
  todoElement.classList.add('todo-card');
  todoElement.dataset.id = todo.id;
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