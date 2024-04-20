export const saveTodoListToLocalStorage = (todos) => {
  localStorage.setItem("todoList", JSON.stringify(todos));
};

export const getTodoListFromLocalStorage = () => {
  const todoListJSON = localStorage.getItem("todoList");
  return todoListJSON ? JSON.parse(todoListJSON) : [];
};

export const generateUniqueId = () => {
  return new Date().getTime().toString();
};
