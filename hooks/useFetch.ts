import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [errorMessage, setErroMessage] = useState("");

  useEffect(() => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
        });
    } catch (error) {
      setErroMessage(error.message);
    }
  }, [url]);

  return { data, loading, errorMessage };
};
