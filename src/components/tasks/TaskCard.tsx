"use client";

import { Task, TaskStatus } from "@/types/task.types";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TaskCardProps = {
  task: Task;
  refetchAction: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, refetchAction }) => {
  const { deleteTask } = useTasks();
  const { isLoading } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTask(task.id);
    refetchAction();
  };

  const handleEdit = () => {
    router.push(`/tasks/${task.id}/edit`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
      <div>
        <Link href={`/tasks/${task.id}`}>
          <h3 className=" text-gray-900 hover:text-indigo-700 font-semibold">
            {task.title}
          </h3>
        </Link>
        <p className="text-gray-500">{task.description}</p>
        <p className="text-gray-500">
          Estado:{" "}
          <span
            className={`font-medium ${
              task.status === TaskStatus.COMPLETED
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {task.status}
          </span>
        </p>
      </div>
      <div className="flex space-x-2">
        {/* Solo aparece el botón si no está completa */}
        {task.status !== TaskStatus.COMPLETED && (
          <button
            className="text-green-500 hover:text-green-600 focus:outline-none"
            onClick={handleEdit}
            disabled={isLoading}
          >
            <PencilIcon className="h-6 w-6" />
          </button>
        )}
        <button
          className="text-red-500 hover:text-red-600 focus:outline-none"
          onClick={handleDelete}
          disabled={isLoading}
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
