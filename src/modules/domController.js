import { storeAppData, loadAppData } from "./storage.js";
import { ProjectManager } from "./projectManager.js";
import { Project } from "./project.js";
import { Todo } from "./todo.js";
import * as dom from "./dom.js";
import "../css/styles.css";

const addProjectBtn = document.querySelector(".add-project-btn");
const projectModal = document.querySelector(".project-modal");
const projectForm = document.querySelector(".project-form");
const addTodoBtn = document.querySelector(".add-todo-btn");
const todoModal = document.querySelector(".todo-modal");
const todoForm = document.querySelector(".todo-form");
const projectList = document.querySelector(".project-list");
const todoCards = document.querySelector(".todo-cards");
const projectManager = new ProjectManager();
let activeProject = null;

addProjectBtn.addEventListener("click", showDialogElement);
projectModal.addEventListener("click", closeDialogElement);
projectForm.addEventListener("submit", submitProjectForm);
addTodoBtn.addEventListener("click", showDialogElement);
todoModal.addEventListener("click", closeDialogElement);
todoForm.addEventListener("submit", submitTodoForm);
projectList.addEventListener("click", handleProjectClick);
todoCards.addEventListener("click", handleTodoClick);

const getActiveProject = () => activeProject;

function setActiveProject(project) {
  if (!project) return;
  activeProject = projectManager.find(project.id);
}

function resetActiveProject() {
  const projects = projectManager.projects;
  setActiveProject(projects[0]);
}

function addProject(name) {
  const project = new Project(name);
  projectManager.add(project);
  storeAppData(projectManager);
}

function removeProject(projectToRemove) {
  projectManager.remove(projectToRemove.id);
  storeAppData(projectManager);

  if (projectToRemove === getActiveProject()) {
    resetActiveProject();
  }
}

function addTodo(todoData = {}) {
  const activeProject = getActiveProject();
  const todo = new Todo(todoData);
  activeProject.add(todo);
  storeAppData(projectManager);
}

function removeTodo(todoToRemove) {
  const activeProject = getActiveProject();
  activeProject.remove(todoToRemove.id);
  storeAppData(projectManager);
  updateDisplay();
}

function toggleTodoDone(todo) {
  todo.toggle();
  dom.toggleDoneClass(todo);
  storeAppData(projectManager);
}

function showEditTodoModal(todo) {
  dom.populateTodoForm(todo);
  showTodoModal("Edit Task");
}

function updateTodo(id, newData = {}) {
  const activeProject = getActiveProject();
  const todo = activeProject.find(id);
  todo.update(newData);
  storeAppData(projectManager);
}

function submitProjectForm() {
  const inputs = projectForm.elements;
  const projectName = inputs["project-name"].value.trim();

  addProject(projectName);
  projectForm.reset();
  updateDisplay();
}

function submitTodoForm() {
  const inputs = todoForm.elements;
  const title = inputs["todo-title"].value.trim();
  const description = inputs["todo-description"].value.trim();
  const dueDate = inputs["todo-due-date"].value;
  const priority = inputs["todo-priority"].value;
  const id = inputs["todoId"].value;
  const todoData = { title, description, dueDate, priority };

  if (id) {
    const newData = { title, description, dueDate, priority };
    updateTodo(id, newData);
    inputs["todoId"].value = "";
  } else {
    addTodo(todoData);
  }

  todoForm.reset();
  updateDisplay();
}

function showTodoModal(formTitle) {
  dom.renderTodoFormTitle(formTitle);
  todoModal.showModal();
}

function showDialogElement(e) {
  const selectedButton = getSelectedBtn(e);

  const modalBtns = {
    projectModalBtn: () => projectModal.showModal(),
    todoModalBtn: () => showTodoModal("Add New Task"),
  };

  if (selectedButton) {
    modalBtns[selectedButton]();
  }
}

function closeDialogElement(e) {
  if (!e.target.classList.contains("close-btn")) return;
  const dialog = e.target.closest("dialog");
  const form = e.target.closest("form");

  dialog.close();
  form.reset();
}

function getSelectedBtn(e) {
  const button = e.target.closest("button");
  const selectedButton = button.dataset.modalBtn;
  return selectedButton;
}

function handleProjectClick(e) {
  const projectElement = e.target.closest("[data-id]");
  const projectId = projectElement?.dataset.id;
  const project = projectManager.find(projectId);

  if (e.target.classList.contains("delete-btn")) {
    removeProject(project);
  } else {
    setActiveProject(project);
  }

  updateDisplay();
}

function handleTodoClick(e) {
  const todoCard = e.target.closest(".card");
  const todoId = todoCard?.dataset.id;
  const todo = activeProject.find(todoId);
  const selectedEl = e.target.closest("[data-action]");
  const action = selectedEl?.dataset.action;

  const todoActions = {
    expand: dom.toggleDetailsElement,
    toggle: toggleTodoDone,
    delete: removeTodo,
    edit: showEditTodoModal,
  };

  if (action) {
    todoActions[action](todo);
  }
}

function updateDisplay() {
  const projects = projectManager.projects;
  const activeProject = getActiveProject();

  dom.renderProjectItems(projects);

  if (activeProject) {
    const todos = activeProject.todos;
    dom.renderTodoCards(todos);
    dom.renderActiveProject(activeProject);
  }
}

function restoreAppData(data = []) {
  data.forEach(({ isRemovable, name, todos }) => {
    const project = !isRemovable
      ? Project.createProtectedProject(name)
      : new Project(name);

    for (const todo of todos) {
      if (!todo.done) {
        const todoItem = new Todo(todo);
        project.add(todoItem);
      }
    }

    projectManager.add(project);
  });
}

function loadApp() {
  const data = loadAppData();

  if (!data) {
    const inbox = Project.createProtectedProject("Inbox");

    const todo1 = new Todo({
      title: "Wash the car",
      description: "Don't forget to clean the floor mats!",
      priority: "low",
    });

    const todo2 = new Todo({
      title: "Go Shopping",
      description: "Buy milk, eggs and bread",
      dueDate: new Date().toISOString(),
      priority: "medium",
    });

    inbox.add(todo1);
    inbox.add(todo2);
    projectManager.add(inbox);
    storeAppData(projectManager);
  } else {
    restoreAppData(data);
  }

  resetActiveProject();
  updateDisplay();
}

export { loadApp };
