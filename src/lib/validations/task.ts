import { TaskStatus } from "@/types/task.types";
import * as z from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(50, "El título no puede tener más de 50 caracteres"),

  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(200, "La descripción no puede tener más de 200 caracteres"),

  completionDate: z.optional(z.string()),

  status: z.optional(z.nativeEnum(TaskStatus)),
});

export const taskUpdateSchema = z.object({
  title: z.optional(
    z
      .string()
      .min(5, "El título debe tener al menos 5 caracteres")
      .max(20, "El título no puede tener más de 20 caracteres")
  ),

  description: z.optional(
    z
      .string()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .max(200, "La descripción no puede tener más de 200 caracteres")
  ),
  completionDate: z.optional(z.string()),

  status: z.optional(z.nativeEnum(TaskStatus)),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
export type TaskUpdateFormValues = z.infer<typeof taskUpdateSchema>;
