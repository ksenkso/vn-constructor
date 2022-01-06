import {createContext, FC, useContext, useState} from "react";
import {api} from "./api";

const authContext = createContext<Auth>(null!);

export const ProvideAuth: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

interface Auth {
  login(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
  refresh(): Promise<void>;
  isLoggedIn: boolean;
}

function useProvideAuth(): Auth {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const login = (username: string, password: string) => api.login(username, password)
    .then(() => {
      setLoggedIn(true)
    })
  const logout = () => api.logout()
    .then(() => {
      setLoggedIn(false)
    })
  const refresh = () => api.refresh()
    .then(() => {
      setLoggedIn(true)
    })

  return {
    login,
    logout,
    refresh,
    isLoggedIn,
  };
}
