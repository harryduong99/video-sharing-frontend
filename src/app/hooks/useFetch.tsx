import { useState, useCallback, useEffect } from "react";

export const useGetQuery = (query: string, customHeader?: any) => {
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusCode, setStatusCode] = useState(-1);
  const header = {
    "Content-Type": "application/json",
  };

  const get = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(query, {
        method: "GET",
        headers: { ...header, ...customHeader },
      });
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
        setError(null);
      }
      setStatusCode(response.status);
      setResponseData(json);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      setIsSuccess(false);
    }
  }, [query, customHeader]);

  return { responseData, loading, error, isSuccess, statusCode, get };
};

export const usePostQuery = (
  query: string,
  customHeader?: any
): {
  post: (data: any) => Promise<void>;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  statusCode: any;
  responseData: any;
} => {
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusCode, setStatusCode] = useState(-1);

  const header = {
    "Content-Type": "application/json",
  };

  const post = useCallback(
    async (data: any) => {
      try {
        setLoading(true);
        const response = await fetch(query, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { ...header, ...customHeader },
        });
        const json = await response.json();
        if (!response.ok) {
          setError(json.error);
          setIsSuccess(false);
        } else {
          setIsSuccess(true);
          setError(null);
        }
        setStatusCode(response.status);
        setResponseData(json);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
        setIsSuccess(false);
      }
    },
    [customHeader, query]
  );

  return { responseData, loading, error, isSuccess, statusCode, post };
};
