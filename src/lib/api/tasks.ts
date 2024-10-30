import api from "@/lib/utils/axios";
import { Task, TaskUpdate } from "@/types/task.types";

export const tasksService = {
  async getTasks(filter: string): Promise<Task[]> {
    if (filter && filter !== "all") {
      const { data } = await api.get<Task[]>(`/tasks?status=${filter}`);
      return data;
    }
    const { data } = await api.get<Task[]>("/tasks");
    return data;
  },

  async createTask(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
    const { data } = await api.post<Task>("/tasks", task);
    return data;
  },

  async updateTask(id: string, task: TaskUpdate): Promise<Task> {
    const { data } = await api.patch<Task>(`/tasks/${id}`, task);
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async getTask(id: string): Promise<Task> {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },
};
