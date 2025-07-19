import projectManager from './modules/projectManager';
import dom from './modules/dom';

const updateDisplay = () => {
  const projects = projectManager.getProjects();
  const activeProject = projectManager.getActiveProject();

  if (activeProject) {
    const todos = activeProject.getTodos();
    dom.renderActiveProjectName(activeProject);
    dom.renderTodos(todos);
  }

  dom.renderProjects(projects);
}