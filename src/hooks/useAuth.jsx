import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ check if user logged in (from cookie or localStorage)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const res = await fetch("http://localhost:3000/auth/check", {
        const res = await fetch("https://cloudstorebackend-i2n1.onrender.com/auth/check", {
          credentials: "include", // important for cookies
        });
        const data = await res.json();
        if (data?.user) setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom Hook to use in components
export function useAuth() {
  return useContext(AuthContext);
}
