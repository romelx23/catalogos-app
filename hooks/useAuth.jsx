import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { baseUrl } from "../utils/config";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUserContext } = useContext(AuthContext);
  const login = async (email, password) => {
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const { data, message } = await res.json();
      console.log(data, message, res);
      console.log("login");
      if (res.status === 401 || res.status === 400) {
        setError("Usuario o contraseña incorrectos");
      } else {
        localStorage.setItem("token", data.token);
        console.log(data);
        setUserContext(true);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      const res = await fetch(`${url}/api/auth/logout`);
      const json = await res.json();
      setUser(null);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const checkUser = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (res.status === 401 || res.status === 400) {
        setError("Sesión Expirada vuelva a ingresar");
      } else {
        const { error } = await res.json();
        setUserContext(true);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    checkUser();
    console.log("useEffect checkUser");
  }, []);
  return { user, loading, error, login, logout };
};
