import { renderProjectItems } from './dom.js';
import { ProjectManager } from './projectManager.js';
import { Project } from './project.js';
import '../css/styles.css';

const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');
const projectForm = document.querySelector('.project-form');
const projectManager = new ProjectManager();
let activeProject = null;

addProjectBtn.addEventListener('click', showDialogElement);
projectForm.addEventListener('submit', submitProjectForm);

const getActiveProject = () => activeProject;

function setActiveProject(projectId) {
  if (!projectId) return;
  activeProject = projectManager.find(projectId);
}

function addProject(name) {
  const project = new Project(name);
  projectManager.add(project);
}

function submitProjectForm() {
  const inputs = projectForm.elements; 
  const projectName = inputs['project-name'].value.trim();

  addProject(projectName);
  projectForm.reset();
  updateDisplay();
}

function showDialogElement(e) {
  const selectedButton = getSelectedBtn(e)
  
  const modalBtns = {
    projectModalBtn: () => projectModal.showModal(),
  }; 
  
  if (selectedButton) {
    modalBtns[selectedButton]();
  }
}

function getSelectedBtn(e) {
  const button = e.target.closest('button');
  const selectedButton = button.dataset.modalBtn;
  return selectedButton;
}

function updateDisplay() {
  renderProjectItems(projectManager.projects);
}
