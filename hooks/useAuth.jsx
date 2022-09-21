import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";

const baseUrl = "https://pokemon-game-chat.herokuapp.com";
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
          correo: email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.msg) {
        setError("Usuario o contraseña incorrectos");
      } else {
        setUserContext(true);
        console.log(data.usuario);
        localStorage.setItem("token", data.token);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
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
  const register = async (email, password) => {
    try {
      const res = await fetch(`${url}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      } else {
        setUser(json);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const checkUser = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/api/message/62f188f7296019255e44ba2e`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await res.json();
      console.log(json);
      if (json.msg) {
        setError("Usuario o contraseña incorrectos");
      } else {
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
  return { user, loading, error, login, logout, register };
};
