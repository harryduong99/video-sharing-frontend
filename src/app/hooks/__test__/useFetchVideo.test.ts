import { renderHook, act } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { useFetchVideos } from "../useFetchVideos";

describe("useFetchVideos", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should make a GET request to the videos endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ videos: [], pagination: {} }));

    const { result } = renderHook(() => useFetchVideos());

    await act(async () => {
      result.current.get();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/videos?page=1&per_page=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should make a GET request to the videos endpoint with custom pagination parameters", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ videos: [], pagination: {} }));

    const page = 2;
    const perPage = 2;

    const { result } = renderHook(() => useFetchVideos(page, perPage));

    await act(async () => {
      result.current.get();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/videos?page=${page}&per_page=${perPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should return loading state while fetching", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ videos: [], pagination: {} }));

    const { result } = renderHook(() => useFetchVideos());

    act(() => {
      result.current.get();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.loading).toBe(false);
  });

  it("should return the response data after successful fetching", async () => {
    const responseData = {
      videos: [{ id: "uuid", title: "Video Youtube 1" }],
      pagination: {},
    };
    fetchMock.mockResponseOnce(JSON.stringify(responseData));

    const { result } = renderHook(() => useFetchVideos());

    await act(async () => {
      result.current.get();
    });

    expect(result.current.responseData).toEqual(responseData);
  });

  it("should return error state if fetching fails", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ error: "Failed to get videos" }),
      {
        status: 500,
      }
    );

    const { result } = renderHook(() => useFetchVideos());

    await act(async () => {
      result.current.get();
    });

    expect(result.current.error).toBe("Failed to get videos");
  });
});
