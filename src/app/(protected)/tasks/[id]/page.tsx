"use client";

import { useTask } from "@/hooks/useTask";
import { useParams } from "next/navigation";

export default function page() {
  const { id } = useParams();
  const { isLoading, task } = useTask(id.toString());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found :/</div>;
  }

  return (
    <div className="w-full flex justify-around gap-9 pt-10">
      <article className="prose bg-gray-800 p-20 border border-white rounded-lg text-center">
        <label htmlFor="title" className="bold text-1xl font-bold">
          Título:
        </label>
        <h1 id="title" className="mb-10">
          {task.title}
        </h1>
        <label
          htmlFor="description"
          className="bold text-1xl font-bold text-wrap"
        >
          Descripción:
        </label>
        <p id="description" className="mb-10">
          {task.description}
        </p>
        <label htmlFor="status" className="bold text-1xl font-bold">
          Estado:
        </label>
        <p id="status">{task.status}</p>
        {task.completionDate && (
          <>
            <label htmlFor="completionDate" className="bold text-1xl font-bold">
              Fecha de finalización:
            </label>
            <p id="completionDate" className="mb-10">
              {task.completionDate.toLocaleString()}
            </p>
          </>
        )}
      </article>
    </div>
  );
}
