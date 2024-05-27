import { useGetQuery, usePostQuery } from "../useFetch";

export const useVerify = (token: string | null) => {
  const { responseData, loading, error, get } = useGetQuery(
    `${process.env.NEXT_PUBLIC_API_HOST}/auth/verify`,
    {Authorization: `Bearer ${token}`}
  );
  return { responseData, loading, error, get };
};
