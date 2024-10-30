import RegisterForm from "@/components/auth/RegisterForm";
import { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Regístrate para comenzar a gestionar tus tareas
          </p>
        </div>
        <RegisterForm />
        <Toaster />
      </div>
    </div>
  );
}
