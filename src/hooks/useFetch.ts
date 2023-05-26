import { useEffect, useState, useMemo } from "react";

export const useFetch = (
  apiUrl: string,
  path: string,
  condition = true,
  protocol = "https://"
) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (condition) {
      fetch(`${protocol}${apiUrl}${path}`)
        .then((resp) => resp.json())
        .then((data) => setData(data))
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    } else {
      setData(undefined);
      setIsLoading(true);
      setError(undefined);
    }
  }, [apiUrl, path, condition, protocol]);

  return useMemo(() => ({ data, error, isLoading }), [data, error, isLoading]);
};
