const createProject = (name = 'Inbox') => {
  const todos = [];

  const getName = () => name;
  const getTodos = () => [...todos];

  function addTodo(todo) {
    todos.push(todo);
  }

  function removeTodo(todo) {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
  }

  function findTodo(title) {
    return todos.find((todo) => todo.getTitle() === title);
  }

  return { getName, getTodos, addTodo, removeTodo, findTodo };
}

export default createProject;