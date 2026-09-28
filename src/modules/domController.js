const addProjectBtn = document.querySelector('.add-project-btn');
const projectModal = document.querySelector('.project-modal');

addProjectBtn.addEventListener('click', showDialogElement);

function getSelectedBtn(e) {
  const button = e.target.closest('button');
  return button.dataset.modalBtn;
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