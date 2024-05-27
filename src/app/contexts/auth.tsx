import { useRouter } from "next/navigation";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useLogin } from "../hooks/auth/useLogin";
import { useVerify } from "../hooks/auth/useVerify";
import { toast } from "react-toastify";

export type User = {
  email: string;
};

type ContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: () => boolean;
  login: (data: any) => void;
  loginError: any;
  verify: () => void;
  logout: () => void;
};

const AuthContext = createContext<ContextType>({
  user: null,
  token: null,
  isAuthenticated: () => false,
  verify: async () => null,
  login: async () => null,
  loginError: null,
  logout: () => {},
});

type Props = { children: ReactNode };

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const {
    responseData: loginResult,
    statusCode: loginStatusCode,
    error: loginError,
    post: requestLogin,
  } = useLogin();

  const {
    responseData: verifyResult,
    error: verifyError,
    get: requestVerify,
  } = useVerify(token);

  const router = useRouter();

  const verify = async () => {
    requestVerify();
  };

  const login = async (data: any) => {
    requestLogin(data);
  };

  useEffect(() => {
    if (loginResult && !loginError) {
      const user = { email: loginResult.email };
      setUser(user);
      setToken(loginResult.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", loginResult.accessToken);
      router.push("/");
    }
  }, [loginResult, loginError]);

  useEffect(() => {
    if (verifyResult && !verifyError) {
      logout();
    }
  }, [verifyResult, verifyError]);

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  const isAuthenticated = () => {
    return user != null;
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userStorage = localStorage.getItem("user");
    const user = userStorage ? JSON.parse(userStorage) : null;
    setToken(token ?? "");
    setUser(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, login, logout, verify, loginError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
