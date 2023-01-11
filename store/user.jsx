import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const DEFAULT_USER = null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_USER);

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("user")) ?? null;
    setUser(dataUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
