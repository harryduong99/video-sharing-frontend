import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { useRegister } from "../../auth/useRegister";

describe("useRegister", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should make a POST request to the register endpoint 1", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Registration successful" })
    );

    const { result } = renderHook(() => useRegister());

    await act(async () => {
      result.current.post({ email: "test@example.com", password: "password" });
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/users`,
      {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password",
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
  });
  it("should return loading state while fetching", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Registration successful" })
    );

    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.post({ email: "test@example.com", password: "password" });
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.loading).toBe(false);
  });

  it("should return the response data after successful registration", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Registration successful" })
    );

    const { result } = renderHook(() => useRegister());

    await act(async () => {
      result.current.post({ email: "test@example.com", password: "password" });
    });

    expect(result.current.responseData).toEqual({
      message: "Registration successful",
    });
  });

  it("should return error state if registration fails", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ error: "Email already exists" }),
      {
        status: 400,
      }
    );

    const { result } = renderHook(() => useRegister());

    await act(async () => {
      result.current.post({ email: "test@example.com", password: "password" });
    });

    expect(result.current.error).toBe("Email already exists");
  });
});
