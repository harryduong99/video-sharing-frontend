import { clx } from "@/utils/helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ButtonPrimary } from "../../buttons/Button";
import { useAuth } from "@/app/contexts/auth";
import { useStateDispatcher } from "@/app/contexts/state";
import { toast } from "react-toastify";
import { error } from "console";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const ModalLoginBody: React.FC<Props> = ({ children, className }) => {
  const { state } = useStateDispatcher();
  const [email, setEmail] = useState(state.currentEmail);
  const [password, setPassword] = useState("");
  const { login, loginError } = useAuth();

  const handleLogin = async () => {
    await login({
      email,
      password,
    });
  };

  useEffect(() => {
    if (loginError) {
      toast.error("Logged in failed");
    }
  }, [loginError])

  return (
    <div className={clx("mt-4", className)}>
      <input
        name="email"
        type="text"
        className="mb-4 block w-full rounded border border-gray-400 bg-transparent px-2 py-2 outline-none"
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
        value={email ?? ""}
      />

      <input
        name="password"
        type="password"
        className="mb-6 block w-full rounded border border-gray-400 bg-transparent px-2 py-2 outline-none"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* {
        loginError && <p className="my-1 text-error text-sm">{loginError?.message}</p>
      }
       */}
      <ButtonPrimary className="login-action w-full mt-4" onClick={handleLogin}>
        Login
      </ButtonPrimary>
      <p className="italic mt-4">
        Don not have an account?{" "}
        <Link className="underline cursor-pointer" href="/register">
          Register
        </Link>
      </p>

      {children}
    </div>
  );
};
