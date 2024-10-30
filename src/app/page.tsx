"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  if (localStorage.getItem("token")) {
    return router.push("/tasks");
  }

  return router.push("/login");
}
