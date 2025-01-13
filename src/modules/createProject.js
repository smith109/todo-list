const createProject = (title) => {
  const todos = [];

  const getTitle = () => title;
  const getTodos = () => [...todos];

  const addTodo = (todo) => {
    todos.push(todo);
  }

  const removeTodo = (todo) => {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
  }

  return { getTitle, getTodos, addTodo, removeTodo };
}

export default createProject;