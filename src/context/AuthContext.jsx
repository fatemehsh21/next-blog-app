"use client";
import { getUserApi, signinApi, signupApi } from "@/services/authService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const { createContext, useReducer, useContext, useEffect } = require("react");

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "signin":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "signup":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
      case "user/loaded":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      break;
  }
};

export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  const router = useRouter();

  async function signin(data) {
    dispatch({ type: "loading" });
    try {
      const { user, message } = await signinApi(data);
      dispatch({ type: "signin", payload: user });
      console.log(user, message);
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }
  async function signup(data) {
    dispatch({ type: "loading" });
    try {
      const { user, message } = await signupApi(data);
      dispatch({ type: "signup", payload: user });
      console.log(user, message);
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }
  async function getUser() {
    dispatch({ type: "loading" });
    try {
      const { user } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
      console.log(user);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await getUser();
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, signin, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("not found auth context");
  return context;
}
