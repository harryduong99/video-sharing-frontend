"use client";

import { usePathname, useRouter } from "next/navigation";

import { Modal } from "@/app/components/modals/Modal";
import { ModalLoginBody } from "@/app/components/modals/auth/ModalLoginBody";

export default function Login() {
  const router = useRouter();

  return (
    <Modal
      className="lg:w-[456px]"
      title={<h4 className="text-2xl text-base-black font-medium">Login</h4>}
    >
      <ModalLoginBody />
    </Modal>
  );
}
