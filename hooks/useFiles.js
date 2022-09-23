import { useEffect, useRef, useState } from "react";
import { getCatalogs } from "../utils/getCatalogs";

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    getCatalogs()
      .then((data) => {
        if (!isMounted.current) return;
        setLoading(false);
        setFiles(data);
      })
      .catch((err) => {
        if (!isMounted.current) return;
        setLoading(false);
        setError(err);
      });
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { files, loading, error };
};
