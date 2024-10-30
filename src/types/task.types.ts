export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  completionDate?: Date;
  createdAt?: Date;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  completionDate?: Date;
  status?: TaskStatus;
}
