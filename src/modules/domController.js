import { renderProjectItems } from './dom.js';
import { ProjectManager } from './projectManager.js';
import { Project } from './project.js';
import '../css/styles.css';

const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');
const projectForm = document.querySelector('.project-form');
const projectManager = new ProjectManager();

addProjectBtn.addEventListener('click', showDialogElement);
projectForm.addEventListener('submit', submitProjectForm);

function updateDisplay() {
  renderProjectItems(projectManager.projects);
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

function getSelectedBtn(e) {
  const button = e.target.closest('button');
  const selectedButton = button.dataset.modalBtn;
  return selectedButton;
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
