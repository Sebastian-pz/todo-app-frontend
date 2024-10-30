"use client";
import { useTask } from "@/hooks/useTask";
import { TaskUpdateFormValues, taskUpdateSchema } from "@/lib/validations/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const { id } = useParams();
  const { isLoading, task, updateTask } = useTask(id.toString());
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskUpdateFormValues>({
    resolver: zodResolver(taskUpdateSchema),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found :/</div>;
  }

  async function onSubmit(data: TaskUpdateFormValues) {
    try {
      setIsLoadingUpdate(true);

      let updatedTask = task!;
      if (data.title) updatedTask.title = data.title;
      if (data.description) updatedTask.description = data.description;
      if (data.completionDate)
        updatedTask.completionDate = new Date(data.completionDate);
      if (data.status) updatedTask.status = data.status;

      await updateTask(updatedTask);

      setIsLoadingUpdate(false);
      router.push(`/tasks`);
    } catch (e) {
      setIsLoadingUpdate(false);
    }
  }

  return (
    <div className="w-full flex justify-around gap-9 pt-10 space-y-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="prose bg-gray-950 p-20 border border-white rounded-lg text-center "
      >
        <div className="flex flex-col text-center">
          <label htmlFor="title" className="bold text-1xl font-bold">
            Título:
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder={task.title}
            className=" mt-1  block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col text-center">
          <label
            htmlFor="description"
            className="bold text-1xl font-bold text-wrap"
          >
            Descripción:
          </label>
          <textarea
            {...register("description")}
            id="description"
            placeholder={task.description}
            className="text-gray-900 mt-1  block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col text-center">
          <label htmlFor="status" className="bold text-1xl font-bold">
            Estado:
          </label>
          <select
            {...register("status")}
            id="status"
            defaultValue={task.status}
            className="text-gray-900 mt-1  w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          >
            <option value="PENDING">Pendiente</option>
            <option value="IN_PROGRESS">En progreso</option>
            <option value="COMPLETED">Completado</option>
          </select>
        </div>

        <div>
          <label htmlFor="completionDate" className="bold text-1xl font-bold">
            {task.completionDate
              ? `Fecha de finalización actual: ${task.completionDate}`
              : "Aún no hay fecha de finalización, ¿desea agregar una?"}
          </label>
          <input
            {...register("completionDate")}
            className="text-gray-900 mt-1  w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            type="date"
            name="completionDate"
            id="completionDate"
          ></input>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-10"
        >
          {isLoadingUpdate ? "Actualizando..." : "Actualizar"}
        </button>
      </form>
    </div>
  );
}
