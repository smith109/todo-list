const createTodo = (title, description, dueDate, priority) => {
  let completed = false;

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getCompleted = () => completed;

  function toggleCompleted() {
    completed = !completed;
  }

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getCompleted,
    toggleCompleted
  }
}

export default createTodo;