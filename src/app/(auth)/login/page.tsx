import LoginForm from "@/components/auth/LoginForm";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="w-full mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
        </div>
        <LoginForm />
        <Toaster />
      </div>
    </div>
  );
}
