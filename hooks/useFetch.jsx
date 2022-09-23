import { useEffect, useState } from "react";
import { baseUrl } from "../utils/config";

export const useFetch = () => {
  const devUrl = `${baseUrl}/api/catalog`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  const postForm = async (data) => {
    try {
      const res = await fetch(`${devUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const deleteCatalog = async (id) => {
    try {
      const res = await fetch(`${devUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": token,
        }
      });
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const updateCatalog = async (id, data) => {
    try {
      const { id, ...rest } = data;
      const res = await fetch(`${devUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(rest),
      });
      const json = await res.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const getCatalogs = async () => {
    try {
      const res = await fetch(`${devUrl}`);
      const { data } = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    data,
    postForm,
    deleteCatalog,
    updateCatalog,
    getCatalogs,
  };
};
