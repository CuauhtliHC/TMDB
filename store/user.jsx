import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const DEFAULT_USER = null;
const DEFAULT_DATA = null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_USER);
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("user")) ?? null;
    setUser(dataUser);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data")) ?? null;
    setData(data);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
