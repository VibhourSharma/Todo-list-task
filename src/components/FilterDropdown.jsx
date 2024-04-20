function FilterDropdown({ filter, setFilter }) {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="p-2 border outline-none rounded-md"
    >
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="Complete">Complete</option>
    </select>
  );
}

export default FilterDropdown;
