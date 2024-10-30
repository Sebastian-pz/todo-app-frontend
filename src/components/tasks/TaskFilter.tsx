import React from "react";

interface TaskFilterProps {
  changeFilter: (filter: string) => void;
  actualFilter: string;
}

export default function TaskFilter({
  actualFilter,
  changeFilter,
}: TaskFilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeFilter(e.target.value);
  };

  return (
    <select
      name="filter"
      id=""
      className="p-2 border-2 rounded-md my-6 text-gray-900"
      onChange={handleChange}
      value={actualFilter}
    >
      <option value="all">Todos</option>
      <option value="PENDING">Pendientes</option>
      <option value="IN_PROGRESS">En progreso</option>
      <option value="COMPLETED">Completadas</option>
    </select>
  );
}
