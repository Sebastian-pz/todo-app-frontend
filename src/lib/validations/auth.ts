import * as z from "zod";

// Acá está en español porque la UI lo va a estar,
// considero que sería buena idea extraer todas las respuestas a un archivo de constantes
export const loginSchema = z.object({
  username: z
    .string()
    .min(5, "El usuario debe tener al menos 5 caracteres")
    .max(20, "El usuario no puede tener más de 20 caracteres"),
  password: z
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .max(50, "La contraseña no puede tener más de 50 caracteres"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(5, "El usuario debe tener al menos 5 caracteres")
      .max(20, "El usuario no puede tener más de 20 caracteres"),

    email: z.string().email("El email no es válido"),

    password: z
      .string()
      .min(5, "La contraseña debe tener al menos 5 caracteres")
      .max(50, "La contraseña no puede tener más de 50 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
      ),
    confirmPassword: z
      .string()
      .min(5, "La contraseña debe tener al menos 5 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
