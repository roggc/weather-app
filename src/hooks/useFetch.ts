import { useEffect, useState } from "react";

export const useFetch = (apiUrl: string, path: string) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://${apiUrl}${path}`)
      .then((resp) => resp.json())
      .then((data) => setData(data))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, [apiUrl, path]);

  return { data, error, isLoading };
};
