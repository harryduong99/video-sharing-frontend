import { renderHook, act, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { useLogin } from "../../auth/useLogin";

describe("useLogin", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should make a POST request to login endpoint", async () => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(
      JSON.stringify({
        accessToken: "test-access-token",
        email: "test@gmail.com",
      })
    );

    const { result } = renderHook(() => useLogin());
    await act(async () => {
      await result.current.post({
        email: "test@gmail.com",
        password: "password",
      });
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email: "test@gmail.com",
          password: "password",
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
  });

  it("should return loading state while fetching", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ accessToken: "test-access-token" })
    );

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      const { loading, post } = result.current;
      expect(loading).toBe(true);
      await post({ email: "test@example.com", password: "password" });
    });

    expect(result.current.loading).toBe(false);
  });

  it("should return the response data after successful login", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ accessToken: "test-access-token" })
    );

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.post({
        email: "test@example.com",
        password: "password",
      });
    });

    expect(result.current.responseData).toEqual({
      accessToken: "test-access-token",
    });
  });

  it("should return error state if login fails", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: "Invalid password" }), {
      status: 401,
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.post({
        email: "test@example.com",
        password: "password",
      });
    });

    expect(result.current.error).toBe("Invalid password");
  });
});
