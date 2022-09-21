import { useEffect, useState } from "react";

export const useFetch = () => {
  const dev =
    process.env.DEPLOY === "PROD"
      ? process.env.BASE_URL
      : "http://localhost:3000";
  const baseUrl = `${dev}/api/catalogs`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const postForm = async (data) => {
    try {
      const res = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
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
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
  const getCatalogs = async () => {
    try {
      const res = await fetch(`${baseUrl}`);
      const json = await res.json();
      setData(json);
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
