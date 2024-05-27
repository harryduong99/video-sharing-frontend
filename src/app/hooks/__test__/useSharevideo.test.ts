import { renderHook, act } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { useShareVideo } from "../useShareVideo";

describe("useShareVideo", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should make a POST request to the videos endpoint", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ id: "123", title: "Test Video" })
    );

    const token = "auth-token";

    const { result } = renderHook(() => useShareVideo(token));

    const videoData = {
      url: "https://youtu.be/r8vczejn4os?si=l8fy3ABj0oLaWw0c",
    };

    await act(async () => {
      result.current.post(videoData);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/videos`,
      {
        method: "POST",
        body: JSON.stringify(videoData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it("should return loading state while sharing", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ id: "uuid", title: "Test Video" })
    );

    const { result } = renderHook(() => useShareVideo("auth-token"));

    act(() => {
      result.current.post({
        url: "https://youtu.be/r8vczejn4os?si=l8fy3ABj0oLaWw0c",
      });
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.loading).toBe(false);
  });

  it("should return the response data after successful sharing", async () => {
    const responseData = { id: "123", title: "Test Video" };
    fetchMock.mockResponseOnce(JSON.stringify(responseData));

    const { result } = renderHook(() => useShareVideo("auth-token"));

    await act(async () => {
      result.current.post({
        url: "https://youtu.be/r8vczejn4os?si=l8fy3ABj0oLaWw0c",
      });
    });

    expect(result.current.responseData).toEqual(responseData);
  });

  it("should return error if sharing failed", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ error: "Failed to share video" }),
      {
        status: 500,
      }
    );

    const { result } = renderHook(() => useShareVideo("auth-token"));

    await act(async () => {
      result.current.post({
        url: "https://youtu.be/r8vczejn4os?si=l8fy3ABj0oLaWw0c",
      });
    });

    expect(result.current.error).toBe("Failed to share video");
  });
});
