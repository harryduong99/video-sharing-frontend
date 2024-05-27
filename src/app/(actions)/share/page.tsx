"use client";

import { useRouter } from "next/navigation";

import { Modal } from "@/app/components/modals/Modal";
import { ModalShareVideoBody } from "@/app/components/modals/video/ModalShareVideoBody";

export default function Share() {
  const router = useRouter();

  return (
    <Modal
      className="lg:w-[550px]"
      title={<h4 className="text-2xl text-base-black font-medium">Share a Youtube Video</h4>}
    >
      <ModalShareVideoBody />
    </Modal>
  );
}
