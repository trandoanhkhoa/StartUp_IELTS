import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "@/api/axiosClient.jsx";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  // Tự động attach token cho mọi request
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      const t = localStorage.getItem("token");
      if (t) config.headers.Authorization = `Bearer ${t}`;
      return config;
    });

    return () => api.interceptors.request.eject(reqInterceptor);
  }, []);

  // Load user từ token (gọi backend)
  useEffect(() => {
    const loadMe = async () => {
      try {
        if (!token) {
          setProfile(null);
          return;
        }
        // Backend bạn cần có endpoint /auth/me
        const res = await api.get("/auth/me");
        setProfile(res.data.user);
      } catch (err) {
        // token lỗi/hết hạn
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        setToken("");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadMe();
  }, [token]);

  // Login: backend trả token
  const signIn = async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });
    const jwt = res?.data.token;
    if (!jwt) throw new Error("Backend không trả token");

    localStorage.setItem("token", jwt);
    setToken(jwt);

    // nếu backend trả user luôn
    if (res?.data?.user) {
      setProfile(res.data.user);
      localStorage.setItem("profile", JSON.stringify(res.data.user));
    } else {
      localStorage.removeItem("profile");
      setProfile(null);
    }

    return res;
  };

  // Register
  const signUp = async ({ name, email, password }) => {
    const res = await api.post("/auth/register", { name, email, password });
    return res;
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setToken("");
    setProfile(null);
  };
  const value = useMemo(
    () => ({
      token,
      profile,
      loading,
      isAuthenticated,
      isAdmin: profile?.role === "admin",
      signIn,
      signUp,
      signOut,
    }),
    [token, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
