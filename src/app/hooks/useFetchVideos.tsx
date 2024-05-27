import { useGetQuery } from "./useFetch";

export const useFetchVideos = (page: number = 1, perPage: number = 5) => {
  const { responseData, loading, error, isSuccess, get } = useGetQuery(
    `${process.env.NEXT_PUBLIC_API_HOST}/videos?page=${page}&per_page=${perPage}`
  );
  return { responseData, loading, error, isSuccess, get };
};
