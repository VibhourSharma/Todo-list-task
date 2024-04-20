import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      if (editIndex !== null) {
        const newTodos = [...todos];
        newTodos[editIndex].text = inputValue;
        setTodos(newTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, { text: inputValue, status: "Active" }]);
      }
      setInputValue("");
    }
  };

  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setInputValue("");
  };

  const toggleTodoStatus = (index) => {
    const newTodos = [...todos];
    newTodos[index].status =
      newTodos[index].status === "Active" ? "Complete" : "Active";
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <span className="text-2xl p-2 m-2 font-bold">Todo List</span>
      <div className="flex items-center justify-center gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a todo..."
          className="p-1 w-72"
        />
        <button onClick={handleAddTodo} className="">
          {editIndex !== null ? "Edit" : "Add"}
        </button>
      </div>
      <ul className="p-2 w-[50%]">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-center gap-24 p-2 mt-2"
          >
            <span>{todo.text}</span>
            <span>Status: {todo.status}</span>
            <button
              onClick={() => toggleTodoStatus(index)}
              disabled={todo.status === "Complete"}
            >
              {todo.status === "Active" ? "Complete" : "Re-activate"}
            </button>
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleRemoveTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
