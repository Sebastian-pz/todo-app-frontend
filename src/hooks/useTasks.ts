import { useState, useEffect } from "react";
import { Task } from "@/types/task.types";
import { tasksService } from "@/lib/api/tasks";
import { useAuth } from "./useAuth";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const tasks = await tasksService.getTasks(filter);
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [filter]);

  const createTask = async (task: Omit<Task, "id" | "createdAt">) => {
    try {
      setIsLoading(true);
      const newTask = await tasksService.createTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      setIsLoading(true);
      await tasksService.updateTask(task.id, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setIsLoading(true);
      await tasksService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    refetchTasks: fetchTasks,
    setFilter,
    filter,
  };
};
