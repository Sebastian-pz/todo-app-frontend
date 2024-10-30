"use client";

import { useTask } from "@/hooks/useTask";
import { CalendarIcon } from "@heroicons/react/24/outline";
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
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {task.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {task.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {task.status}
          </p>
          {task.completionDate && (
            <>
              <CalendarIcon className="h-6 w-6 text-gray-400  mx-2" />
              <p className="font-light text-gray-400 text-xs">
                {task.completionDate.toLocaleString()}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
