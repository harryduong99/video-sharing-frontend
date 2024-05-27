import { renderHook, act } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { useVerify } from "../../auth/useVerify";

describe("useVerify", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should make a GET request to the verify endpoint with token in the header", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ verified: true }));
    const token = "test-token";

    const { result } = renderHook(() => useVerify(token));

    await act(async () => {
      result.current.get();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/verify`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  });

  it("should return loading state while fetching", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ verified: true }));
    const token = "test-token";

    const { result } = renderHook(() => useVerify(token));

    act(() => {
      result.current.get();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.loading).toBe(false);
  });

  it("should return the response data after successful verification", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ verified: true }));
    const token = "test-token";

    const { result } = renderHook(() => useVerify(token));

    await act(async () => {
      result.current.get();
    });

    expect(result.current.responseData).toEqual({ verified: true });
  });

  it("should return error state if verification fails", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: "Token expired" }), {
      status: 401,
    });
    const token = "test-token";

    const { result } = renderHook(() => useVerify(token));

    await act(async () => {
      result.current.get();
    });

    expect(result.current.error).toBe("Token expired");
  });
});
