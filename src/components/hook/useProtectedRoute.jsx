"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../AuthProvider"; // adjust path if needed

export default function useProtectedRoute() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Redirect to login if not logged in and auth state is loaded
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Return loading state so pages can show a loader if needed
  return { user, loading };
}
