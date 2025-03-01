const createTodo = (title, description, dueDate, priority) => {
  const id = crypto.randomUUID();
  let completed = false;

  const getId = () => id;
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getCompleted = () => completed;

  function toggleCompleted() {
    completed = !completed;
  }

  return {
    getId,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getCompleted,
    toggleCompleted
  }
}

export default createTodo;