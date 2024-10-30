"use client";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";

import TaskFilter from "@/components/tasks/TaskFilter";

import { useTasks } from "@/hooks/useTasks";

export default function page() {
  const { tasks, isLoading, refetchTasks, filter, setFilter } = useTasks();

  return (
    <div className="w-full min-w-screen flex-col lg:flex-row flex justify-around gap-9 pt-10 px-2 lg:px-20">
      <div className=" lg:w-2/3">
        <TaskFilter actualFilter={filter} changeFilter={setFilter} />
        <TaskList tasks={tasks} isLoading={isLoading} refetch={refetchTasks} />
      </div>
      <div className="lg:w-1/3">
        <TaskForm refetch={refetchTasks} />
      </div>
    </div>
  );
}
