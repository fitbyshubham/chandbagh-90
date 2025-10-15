// src/components/AuthProvider.jsx
"use client";

import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// Create context without TypeScript types
const AuthContext = createContext({ user: null });

// Higher order component to provide authentication context
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Updates the user state when the user logs in or out
      setUser(user || null);
    });

    // cleanup
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);