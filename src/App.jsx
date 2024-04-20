import { useState, useMemo } from "react";
import {
  saveTodoListToLocalStorage,
  getTodoListFromLocalStorage,
  generateUniqueId,
} from "./utils/LocalStorage";
import FilterDropdown from "./components/FilterDropdown";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function TodoList() {
  const [todos, setTodos] = useState(getTodoListFromLocalStorage());
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredTodos = useMemo(() => {
    if (filter === "All") {
      return todos;
    } else {
      return todos.filter((todo) => todo.status === filter);
    }
  }, [todos, filter]);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: generateUniqueId(),
        text: inputValue,
        status: "Pending",
      };
      if (editId !== null) {
        const newTodos = todos.map((todo) =>
          todo.id === editId ? { ...todo, text: inputValue } : todo
        );
        setTodos(newTodos);
        setEditId(null);
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
    saveTodoListToLocalStorage(newTodos);
    setInputValue("");
    setEditId(null);
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

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInputValue(todoToEdit.text);
      setEditId(id);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <span className="text-3xl p-2 m-2 font-bold">Todo List</span>
      <div className="flex items-center justify-center gap-2">
        <FilterDropdown filter={filter} setFilter={setFilter} />
        <TodoForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAddTodo={handleAddTodo}
          editId={editId}
        />
      </div>
      {filteredTodos.length === 0 ? (
        <p className="text-gray-500 mt-4 p-4">Todo list is empty!⚠️</p>
      ) : (
        <ul className="p-2 w-[50%]">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleEditTodo={handleEditTodo}
              toggleTodoStatus={toggleTodoStatus}
              handleRemoveTodo={handleRemoveTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
