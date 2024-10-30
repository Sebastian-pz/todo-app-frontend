import { tasksService } from "@/lib/api/tasks";
import { Task, TaskUpdate } from "@/types/task.types";
import { useEffect, useState } from "react";

interface useTaskProps {
  id: string;
}

export const useTask = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [task, setTask] = useState<Task>();

  const fetchTask = async () => {
    try {
      setIsLoading(true);
      const task = await tasksService.getTask(id);
      const data = task;
      setTask(data);
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      setIsLoading(true);
      const { id, createdAt, ...updatedTask } = task;
      await tasksService.updateTask(task.id, updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  return { task, isLoading, updateTask };
};
