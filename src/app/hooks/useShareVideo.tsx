import { usePostQuery } from "./useFetch";

export const useShareVideo = (token: string | null) => {
  const { responseData, loading, error, isSuccess, statusCode, post } =
    usePostQuery(`${process.env.NEXT_PUBLIC_API_HOST}/videos`, {
      Authorization: `Bearer ${token}`,
    });

  return { responseData, loading, error, isSuccess, statusCode, post };
};
