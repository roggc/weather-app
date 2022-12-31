import { useEffect, useState } from "react";

export const useFetch = (
  apiUrl: string,
  path: string,
  condition = true,
  protocol = "https://"
) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(condition);
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
      setIsLoading(condition);
      setError(undefined);
    }
  }, [apiUrl, path, condition, protocol]);

  return { data, error, isLoading };
};
