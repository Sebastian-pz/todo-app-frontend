"use client";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";

import TaskFilter from "@/components/tasks/TaskFilter";

import { useTasks } from "@/hooks/useTasks";

export default function page() {
  const { tasks, isLoading, refetchTasks, filter, setFilter } = useTasks();

  return (
    <div className="w-full flex justify-around gap-9 pt-10">
      <div>
        <TaskFilter actualFilter={filter} changeFilter={setFilter} />
        <TaskList tasks={tasks} isLoading={isLoading} refetch={refetchTasks} />
      </div>
      <TaskForm refetch={refetchTasks} />
    </div>
  );
}
