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

  function findTodo(id) {
    return todos.find((todo) => todo.getId() === id);
  }

  return {
    getId,
    getName,
    getTodos,
    addTodo,
    removeTodo,
    findTodo
  };
}

export default createProject;