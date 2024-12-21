export const createTodo = (title, description, dueDate, priority) => {
  let completed = false;

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getCompleted = () => completed;

  const setTitle = (newTitle) => title = newTitle;
  const setDescription = (newDescription) => description = newDescription;
  const setDueDate = (newDueDate) => dueDate = newDueDate;
  const setPriority = (newPriority) => priority = newPriority;

  const toggleCompleted = () => completed = !completed;

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getCompleted,
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    toggleCompleted
  };
};