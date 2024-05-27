import { usePostQuery } from "../useFetch";

export const useLogin = () => {
  const { responseData, loading, error, post, statusCode } = usePostQuery(
    `${process.env.NEXT_PUBLIC_API_HOST}/auth/login`
  );

  return { responseData, loading, error, post, statusCode };
};
