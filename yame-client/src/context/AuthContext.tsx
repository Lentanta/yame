import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";

const AuthContext = createContext<{
  user: { username: string, id: number, token: string } | null;
  login: (username: string, password: string, callback: () => void) => void;
  logout: () => void
}>(null!);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string, id: number, token: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.get("http://localhost:3000/users/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.data)
      .then((resData) => {
        const data = resData.data as { id: number, username: string };
        setUser({ id: data.id, username: data.username, token: token || "" })
      })
      .catch((err) => {
        console.log(err)
        localStorage.removeItem("accessToken")
      })
  }, [])

  const login = (username: string, password: string, callback: () => void) => {
    axios.post("http://localhost:3000/users/sign-in", { username, password })
      .then((res) => res.data)
      .then((resData) => {
        const data = resData.data as { id: number, username: string, accessToken: string };
        setUser({ id: data.id, username: data.username, token: data.accessToken })
        localStorage.setItem("accessToken", data.accessToken)
        callback()
      })
      .catch((err) => { console.log(err) })
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

