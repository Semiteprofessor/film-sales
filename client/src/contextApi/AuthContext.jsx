import { useReducer, createContext, useContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../base";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: "",
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload.error,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: "",
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload.error,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [paymentReference, setPaymentReference] = useState("");

  const loginUser = async (email, password) => {
    await axios(`${BASE_URL}/user/login`, {
      method: "POST",
      data: JSON.stringify({ email, password }),
    }).then((response) => {
      if (response.status !== true) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { error: response.data.message },
        });
        return;
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: response.data } });
    });
  };

  const registerUser = async (name, email, password, dob, phone, address) => {
    await axios(`${BASE_URL}/user/register`, {
      method: "POST",
      data: JSON.stringify({
        name,
        email,
        password,
        dob,
        phone,
        address,
      }),
    }).then((response) => {
      if (response.status !== true) {
        dispatch({
          type: "REGISTER_FAILURE",
          payload: { error: response.data.message },
        });
        return;
      }
      dispatch({ type: "REGISTER_SUCCESS", payload: { user: response.data } });
    });
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        registerUser,
        loginUser,
        logoutUser,
        paymentReference,
        setPaymentReference,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
