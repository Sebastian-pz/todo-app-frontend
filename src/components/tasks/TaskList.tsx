"use client";

import TaskCard from "./TaskCard";
import Loading from "@/components/common/Loading";

import { Task } from "@/types/task.types";

interface propsComponent {
  tasks: Array<Task>;
  isLoading: boolean;
  refetch: () => void;
}

const TaskList = ({ tasks, isLoading, refetch }: propsComponent) => {
  return (
    <div className="space-y-4">
      {isLoading ? (
        <Loading />
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No hay tareas aún.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} refetchAction={refetch} />
        ))
      )}
    </div>
  );
};

export default TaskList;
