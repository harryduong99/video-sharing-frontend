import { clx } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import { ButtonPrimary } from "../../buttons/Button";
import { useAuth } from "@/app/contexts/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { defaultToastOptions } from "@/utils/toast";
import { useSocketContext } from "@/app/contexts/socket";
import { useShareVideo } from "@/app/hooks/useShareVideo";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const ModalShareVideoBody: React.FC<Props> = ({
  children,
  className,
}) => {
  const { socket } = useSocketContext();
  const { token, logout, user } = useAuth();
  const [url, setUrl] = useState("");
  const router = useRouter();

  const {
    responseData,
    isSuccess,
    error,
    statusCode,
    post: shareVideo,
  } = useShareVideo(token);

  useEffect(() => {
    socket.disconnect();
    if (!user) {
      return;
    }
    socket.connect();
  }, []);

  const share = async () => {
    shareVideo({
      url,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      socket.emit("notify", {
        author: user?.email,
        body: `Video: '${responseData.title}' was shared by ${user?.email}`,
      });
      toast.success("Successfully shared video", defaultToastOptions);
      router.push("/");
      return;
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error("Share video failed", defaultToastOptions);
      router.push("/");
    }
  }, [error]);

  useEffect(() => {
    if (statusCode == 401) {
      logout();
      router.push("/");
    }
  }, [statusCode]);

  return (
    <div className={clx("mt-4", className)}>
      <input
        type="text"
        className="mb-4 block w-full rounded border border-gray-400 bg-transparent px-2 py-2 outline-none"
        placeholder="Youtube URL"
        onChange={(e) => setUrl(e.target.value)}
      />

      <ButtonPrimary className="w-full" onClick={share}>
        Share
      </ButtonPrimary>

      {children}
    </div>
  );
};
