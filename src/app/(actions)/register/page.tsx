"use client";

import { usePathname, useRouter } from "next/navigation";

import { Modal } from "@/app/components/modals/Modal";
import { ModalLoginBody } from "@/app/components/modals/auth/ModalLoginBody";
import { ModalRegisterBody } from "@/app/components/modals/auth/ModalRegisterBody";

export default function Register() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Modal
      className="lg:w-[456px]"
      title={<h4 className="text-2xl text-base-black font-medium">Register</h4>}
    >
      <ModalRegisterBody />
    </Modal>
  );
}
