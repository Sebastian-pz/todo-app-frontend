import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/auth";
import { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const response = await authService.login(values);
      localStorage.setItem("token", response.accessToken);
      toast.success("¡Inicio de sesión exitoso!");
      router.push("/tasks");
    } catch (error) {
      toast.error("Usuario o contraseña incorrectos");
      console.error("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (values: RegisterFormValues) => {
    try {
      setIsLoading(true);
      const response = await authService.register(values);
      localStorage.setItem("token", response.accessToken);
      toast.success("¡Registro exitoso!");
      router.push("/tasks");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al registrarse");
      console.error("Error en registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    toast.success("Sesión cerrada correctamente");
  };

  return {
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: authService.isAuthenticated(),
  };
};
