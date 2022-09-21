import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./AuthReducer";

export const Auth_INITIAL_STATE = {
  user: false,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, Auth_INITIAL_STATE);
  const setUserContext = (user) => {
    dispatch({ type: "[Auth] - SET_USER", payload: user });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUserContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
