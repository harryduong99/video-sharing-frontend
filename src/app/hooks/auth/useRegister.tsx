import { usePostQuery } from "../useFetch";

export const useRegister = () => {
  const { responseData, loading, error, post } = usePostQuery(
    `${process.env.NEXT_PUBLIC_API_HOST}/users`
  );

  return { responseData, loading, error, post };
};
