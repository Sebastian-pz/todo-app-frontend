"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormValues } from "@/lib/validations/task";
import { useTasks } from "@/hooks/useTasks";
import { TaskStatus } from "@/types/task.types";

interface TaskFormProps {
  refetch: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ refetch }) => {
  const { createTask } = useTasks();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      setIsLoading(true);
      if (data.completionDate) {
        await createTask({
          title: data.title,
          description: data.description,
          completionDate: new Date(data.completionDate),
          status: TaskStatus.PENDING,
        });
      } else {
        await createTask({
          title: data.title,
          description: data.description,
          status: TaskStatus.PENDING,
        });
      }
      refetch();
      reset();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-w-80">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-400"
        >
          Título
        </label>
        <input
          {...register("title")}
          type="text"
          id="title"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 text-wrap">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-400"
        >
          Descripción
        </label>
        <textarea
          {...register("description")}
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 text-wrap">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="completionDate"
          className="block text-sm font-medium text-gray-400"
        >
          Fecha de finalización (Opcional)
        </label>
        <input
          {...register("completionDate")}
          id="completionDate"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
          type="date"
        />
        {errors.completionDate && (
          <p className="mt-1 text-sm text-red-600 text-wrap">
            {errors.completionDate.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={isLoading}
      >
        {isLoading ? "Creando..." : "Crear Tarea"}
      </button>
    </form>
  );
};

export default TaskForm;
