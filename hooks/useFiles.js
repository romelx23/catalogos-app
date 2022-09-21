import { useEffect, useState } from "react";

export const useFiles = () => {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  console.log(baseUrl);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFiles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/catalogs`);
      const cards = await res.json();
      console.log(cards);
      setFiles(cards.catalogs);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return { files, loading, error, getFiles };
};
