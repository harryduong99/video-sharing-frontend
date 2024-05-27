import React, { useEffect, useState } from "react";
import { ButtonPrimary } from "../../buttons/Button";
import { clx } from "@/utils/helpers";
import { useRegister } from "@/app/hooks/auth/useRegister";
import { useRouter } from "next/navigation";
import { useStateDispatcher } from "@/app/contexts/state";
import { toast } from "react-toastify";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const ModalRegisterBody: React.FC<Props> = ({ children, className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reTypedPassword, setReTypedPassword] = useState("");
  const router = useRouter();
  const { dispatch } = useStateDispatcher();

  const {
    responseData: registerResult,
    loading,
    error,
    post: requestRegister,
  } = useRegister();

  const handleRegister = async () => {
    requestRegister({
      email,
      password,
    });
  };

  useEffect(() => {
    if (registerResult && !error) {
      dispatch({ type: "setCurrentEmail", payload: registerResult?.email });
      toast.success("Account registered successfully");

      router.push("/login");
    }
  }, [registerResult, error]);

  useEffect(() => {
    if (error) {
      toast.error("Account register failed");
    }
  }, [error]);

  return (
    <div className={clx("mt-4", className)}>
      <input
        type="text"
        className="mb-4 block w-full rounded border border-gray-400 bg-transparent px-2 py-2 outline-none"
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="mb-4 block w-full rounded border border-gray-400 bg-transparent px-2 py-2 outline-none"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <ButtonPrimary className="w-full mt-4" onClick={handleRegister}>
        Register
      </ButtonPrimary>
      {children}
    </div>
  );
};
