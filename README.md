# Todo App - Frontend

Este repositorio contiene la interfaz de usuario de la aplicación Todo App, desarrollada en Next.js y diseñada para interactuar con el backend de la aplicación. **Nota importante**: dado que es una prueba técnica, la aplicación está destinada solo para entorno de desarrollo y requiere tener el backend clonado y funcionando.

## Configuración Inicial

### Clonar el proyecto

```bash
git clone https://github.com/Sebastian-pz/todo-app-frontend
cd todo-app-frontend
```

### Instalar dependencias

```bash
npm install
```

### Variables de entorno

Crea un archivo `.env.local` en el directorio raíz del proyecto y agrega la URL base del backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Ejecutar el proyecto

Para iniciar el entorno de desarrollo, ejecuta:

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:8000` por defecto. Asegúrate de que el backend también esté en funcionamiento en el puerto 3000.

## Estructura del Proyecto

El frontend está organizado principalmente por **features** para una mejor escalabilidad y comprensión del código. A continuación, una descripción de la estructura clave:

```plaintext
src/
├── app/                 # Vistas y rutas de la aplicación
│   ├── (auth)/          # Autenticación
│   │   ├── login/       # Página de login
│   │   └── register/    # Página de registro
│   ├── (protected)/     # Sección protegida para usuarios autenticados
│   │   ├── tasks/       # CRUD de tareas
│   │   └── layout.tsx   # Layout específico para rutas protegidas
├── components/          # Componentes reutilizables
├── hooks/               # Hooks personalizados (auth, tasks)
├── lib/                 # API y utilidades
├── providers/           # Providers para contextos de autenticación y notificaciones
├── store/               # Estado de autenticación
└── types/               # Definición de tipos (auth y task)
```

## Funcionalidades Clave

### Autenticación

La autenticación se gestiona a través de `localStorage`, permitiendo que las credenciales del usuario persistan mientras esté logueado.

- **Login** y **Registro** de usuario están en `/app/(auth)/login` y `/app/(auth)/register`.
- Las rutas protegidas están bajo `/app/(protected)`, y se asegura el acceso únicamente para usuarios autenticados.

### Formularios y Validaciones

Se utilizan `react-hook-form` junto con `zod` para validar los datos en el frontend, con los esquemas de validación definidos en `src/lib/schemas`.

**Ejemplos de esquemas de validación**:

#### Login

```typescript
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
```

#### Registro

```typescript
export const registerSchema = z.object({
  username: z
    .string()
    .min(5, "El usuario debe tener al menos 5 caracteres")
    .max(20, "El usuario no puede tener más de 20 caracteres"),
  email: z.string().email("El email no es válido"),
  password: z
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
      "Debe contener mayúsculas, minúsculas y números"
    ),
  confirmPassword: z
    .string()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Las contraseñas no coinciden",
    }),
});
```

#### Tareas

```typescript
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
```

### Componentes Reutilizables

Los componentes están agrupados en `src/components` y organizados por funcionalidad. Algunos componentes clave incluyen:

- **Auth**: `LoginForm`, `RegisterForm`
- **Tasks**: `TaskCard`, `TaskForm`, `TaskList`

### Providers y Hooks

- **Providers**: `AuthProvider` para la autenticación y `ToastProvider` para notificaciones.
- **Hooks**:
  - `useAuth` para gestionar el estado de autenticación.
  - `useTasks` para operaciones CRUD de tareas.

## Mejoras y Personalizaciones Pendientes

Si el tiempo lo permitiera, estas son algunas mejoras que se podrían implementar para optimizar la funcionalidad y experiencia de usuario en la aplicación:

- **Skeletons**: Implementar skeletons para mejorar la percepción de carga en los componentes que requieren datos asíncronos.
- **Manejo de Estados**: Refinar el manejo de estados para asegurar transiciones suaves y una experiencia sin interrupciones en toda la aplicación.
- **Drag and Drop**: Integrar funcionalidad de arrastrar y soltar (drag and drop) en la interfaz de tareas, para una organización más intuitiva y eficiente.
- **Mensajes de Error**: Centralizar los mensajes de error en un archivo de constantes, facilitando así la gestión y personalización de mensajes en varios idiomas.
- **Estilos**: Realizar un rediseño y mejora significativa de los estilos, con un enfoque en la consistencia visual y la usabilidad.

## Librerías y Dependencias Importantes

- **`axios`**: Para realizar solicitudes HTTP.
- **`react-hot-toast`**: Para notificaciones emergentes y feedback visual.
- **`tailwindcss`**: Para estilos rápidos y responsivos (con algunos componentes adaptados de Tailwind UI).
- **`react-hook-form` + `zod`**: Validación de formularios sencilla y robusta.

---
