function TodoItem({
  todo,
  handleEditTodo,
  toggleTodoStatus,
  handleRemoveTodo,
}) {
  return (
    <li className="flex items-center justify-between p-2.5 mt-4 bg-gray-50">
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
          onClick={() => handleEditTodo(todo.id)}
          className="border border-violet-600 text-violet-600 px-4 py-1 rounded-lg disabled:border-slate-400 disabled:text-slate-400 disabled:cursor-not-allowed"
          disabled={todo.status === "Complete"}
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
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
