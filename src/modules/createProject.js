function createProject(title) {
  const todos = [];

  const getTitle = () => title;
  const getTodos = () => [...todos];

  function addTodo(todo) {
    todos.push(todo);
  }

  function removeTodo(todo) {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
  }

  return { getTitle, getTodos, addTodo, removeTodo };
}

export default createProject;