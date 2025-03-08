const createProject = (name = 'Inbox') => {
  const id = crypto.randomUUID();
  const todos = [];

  const getId = () => id;
  const getName = () => name;
  const getTodos = () => [...todos];

  function addTodo(todo) {
    todos.push(todo);
  }

  function removeTodo(todo) {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
  }

  return {
    getId,
    getName,
    getTodos,
    addTodo,
    removeTodo
  };
}

export default createProject;