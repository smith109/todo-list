import projectManager from './modules/projectManager';
import storage from './modules/storage';
import Project from './modules/Project';
import Todo from './modules/Todo';
import dom from './modules/dom';
import './styles.css';

const projectContainer = document.querySelector('.project-container');
const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');
const projectForm = document.querySelector('.project-form');
const todoContainer = document.querySelector('.todo-container');
const addTodoBtn = document.querySelector('.add-todo-btn');
const todoModal = document.querySelector('.todo-modal');
const todoForm = document.querySelector('.todo-form');

const updateDisplay = () => {
  const projects = projectManager.getProjects();
  const activeProject = projectManager.getActiveProject();

  dom.renderProjects(projects);
  dom.renderActiveProjectName(activeProject);

  if (activeProject) {
    const todos = activeProject.getTodos();
    dom.renderTodos(todos);
    dom.highlightActiveProject(activeProject);
  }
}

const showDialogElement = (e) => {
  const modalButtons = {
    'add-project-btn': () => projectModal.showModal(),

    'add-todo-btn': () => {
      dom.renderTodoFormTitle('Add New Todo');
      todoModal.showModal();
    },

    'edit-todo-btn': () => {
      dom.renderTodoFormTitle('Edit Todo');
      todoModal.showModal();
    }
  }

  const matchingClassKey = dom.findMatchingClassKey(e, modalButtons);

  if (matchingClassKey) {
    modalButtons[matchingClassKey]();
  }
}

const closeDialogElement = (e) => {
  if (!e.target.classList.contains('cancel-btn')) return;
  const dialog = e.target.closest('dialog');
  const form = e.target.closest('form');

  dialog.close();
  form.reset();
}

const submitProjectForm = () => {
  const projectName = projectForm['project-name'].value.trim();

  if (projectName !== '') {
    const project = new Project(projectName);
    projectManager.addProject(project);
    storage.save(projectManager);
    updateDisplay();
  }

  projectForm.reset();
}

const submitTodoForm = () => {
  const activeProject = projectManager.getActiveProject();

  if (!activeProject) {
    alert('Please select a project before adding a Todo.');
    return;
  }

  const todoTitle = todoForm['todo-title'].value.trim();
  const todoDescription = todoForm['todo-description'].value.trim();
  const todoDueDate = todoForm['todo-due-date'].value;
  const todoPriority = todoForm['todo-priority'].value;

  if (todoTitle === '') return

  const editingId = todoForm['todoId'].value;

  if (editingId !== '') {
    const newDetails = {
      title: todoTitle,
      description: todoDescription,
      dueDate: todoDueDate,
      priority: todoPriority
    };

    activeProject.updateTodo(editingId, newDetails);
    dom.setHiddenTodoInput('');
  } else {
    const todo = new Todo(todoTitle, todoDescription, todoDueDate, todoPriority);
    activeProject.addTodo(todo);
  }

  storage.save(projectManager);
  updateDisplay();
  todoForm.reset();
}

const removeProject = (selectedProject) => {
  const activeProject = projectManager.getActiveProject();
  const isActive = (selectedProject === activeProject);

  projectManager.removeProject(selectedProject);
  storage.save(projectManager);

  if (isActive) {
    projectManager.resetActiveProject();
  }
}

const handleProjectClick = (e) => {
  if (e.target.tagName === 'UL') return;
  const projectId = e.target.closest('[data-id]').dataset.id;
  const selectedProject = projectManager.findProjectById(projectId);

  if (e.target.tagName === 'BUTTON') {
    removeProject(selectedProject);
  } else {
    projectManager.setActiveProject(selectedProject);
  }

  updateDisplay();
}

const toggleTodoDone = (todoId) => {
  const activeProject = projectManager.getActiveProject();
  const todo = activeProject.findTodoById(todoId);

  todo.toggleDone();
  storage.save(projectManager);
  dom.toggleTodoDoneClass(todoId, todo);
}

const editTodoDetails = (e, todoId) => {
  const activeProject = projectManager.getActiveProject();
  const todo = activeProject.findTodoById(todoId);

  dom.setHiddenTodoInput(todoId);
  dom.populateTodoForm(todo);
  showDialogElement(e);
}

const deleteTodo = (todoId) => {
  const activeProject = projectManager.getActiveProject();

  activeProject.removeTodo(todoId);
  storage.save(projectManager);
  updateDisplay();
}

const handleTodoClick = (e) => {
  if (e.target.classList.contains('todo-container')) return;
  const todoCard = e.target.closest('.todo-card');
  const todoId = todoCard.dataset.id;

  const todoCardTargets = {
    'todo-checkbox': () => toggleTodoDone(todoId),
    'edit-todo-btn': () => editTodoDetails(e, todoId),
    'delete-todo-btn': () => deleteTodo(todoId),
  }

  const matchingClassKey = dom.findMatchingClassKey(e, todoCardTargets);

  if (matchingClassKey) {
    todoCardTargets[matchingClassKey]();
  } else {
    dom.toggleTodoDetails(todoId);
  }
}

const restore = (data) => {
  const projectStore = data.projects;

  projectStore.forEach(({ name, todos }) => {
    const project = new Project(name);

    todos.filter((todo) => todo.done !== true)
      .forEach(({ title, description, dueDate, priority }) => {
        const todo = new Todo(title, description, dueDate, priority);
        project.addTodo(todo);
      });

    projectManager.addProject(project);
  });

  storage.save(projectManager);
}

const loadApp = () => {
  const data = storage.load();

  if (!data) {
    projectManager.addProject(new Project());
    storage.save(projectManager);
  } else {
    restore(data);
  }

  projectManager.resetActiveProject();
  updateDisplay();
}

projectContainer.addEventListener('click', handleProjectClick);
addProjectBtn.addEventListener('click', showDialogElement);
projectModal.addEventListener('click', closeDialogElement);
projectForm.addEventListener('submit', submitProjectForm);
todoContainer.addEventListener('click', handleTodoClick);
addTodoBtn.addEventListener('click', showDialogElement);
todoModal.addEventListener('click', closeDialogElement);
todoForm.addEventListener('submit', submitTodoForm);

loadApp();