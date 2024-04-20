import React, { useState, useEffect } from "react";
import {
  saveTodoListToLocalStorage,
  getTodoListFromLocalStorage,
  generateUniqueId,
} from "./utils/LocalStorage";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTodos = getTodoListFromLocalStorage();
    setTodos(storedTodos);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: generateUniqueId(),
        text: inputValue,
        status: "Pending",
      };
      if (editIndex !== null) {
        const editedTodo = {
          ...todos[editIndex],
          text: inputValue,
        };
        const newTodos = [...todos];
        newTodos[editIndex] = editedTodo;
        setTodos(newTodos);
        setEditIndex(null);
        saveTodoListToLocalStorage(newTodos);
      } else {
        setTodos([...todos, newTodo]);
        saveTodoListToLocalStorage([...todos, newTodo]);
      }
      setInputValue("");
    }
  };

  const handleRemoveTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setInputValue("");
    setEditIndex(null);
    saveTodoListToLocalStorage(newTodos);
  };

  const toggleTodoStatus = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            status: todo.status === "Pending" ? "Complete" : "Pending",
          }
        : todo
    );
    setTodos(newTodos);
    saveTodoListToLocalStorage(newTodos);
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <span className="text-2xl p-2 m-2 font-bold">Todo List</span>
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a todo..."
          className="p-1 w-72 outline-none border placeholder:font-mono hover:border-gray-400 ease-linear transition-all"
        />
        <button
          onClick={handleAddTodo}
          className="w-20 p-1 rounded-md border bg-teal-500 text-white hover:bg-white hover:text-teal-500 hover:border-teal-500 transition-all ease-linear"
        >
          {editIndex !== null ? "Save" : "Add"}
        </button>
      </div>
      <ul className="p-2 w-[50%]">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2.5 mt-4 bg-gray-50"
          >
            <span className="font-semibold max-w-52">{todo.text}</span>
            <span
              className={`text-xs font-mono p-1 rounded-lg ${
                todo.status === "Complete"
                  ? "text-green-600 border border-green-600"
                  : "bg-orange-100 rounded-md border border-orange-500"
              }`}
            >
              {todo.status}
            </span>
            <div className="flex items-center justify-center gap-8 text-sm">
              <button
                onClick={() => handleEditTodo(index)}
                className="border border-violet-600 text-violet-600 px-4 py-1 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => toggleTodoStatus(todo.id)}
                disabled={todo.status === "Complete"}
                className="border border-blue-600 text-blue-600 p-1 rounded-lg disabled:border-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                Complete
              </button>
              <button
                onClick={() => handleRemoveTodo(todo.id)}
                className="border border-red-600 text-red-600 px-3 py-1 rounded-lg"
                disabled={editIndex === ""}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
