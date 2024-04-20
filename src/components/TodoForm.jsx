function TodoForm({ inputValue, setInputValue, handleAddTodo, editId }) {
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a todo..."
        className="p-1 w-72 outline-none border placeholder:font-mono hover:border-gray-400 ease-linear transition-all"
      />
      <button
        onClick={handleAddTodo}
        className="w-20 p-1 rounded-md border bg-teal-500 text-white hover:bg-white hover:text-teal-500 hover:border-teal-500 transition-all ease-linear"
      >
        {editId !== null ? "Save" : "Add"}
      </button>
    </div>
  );
}

export default TodoForm;
