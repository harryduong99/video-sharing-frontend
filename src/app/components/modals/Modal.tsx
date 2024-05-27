import { clx } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React, {
  useEffect,
  useRef,
  useState
} from "react";

import Portal from "@/app/components/utils/Portal";
import { ButtonClose } from "../buttons/ButtonClose";

interface Props {
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactElement | null;
}

export interface ModalHandles {
  triggerClose: () => void;
}

export const Modal: React.FC<Props> = (
  { children, className, title },
) => {

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const close = () => {
    setIsOpen(false);
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const classes = clx(
    "modal relative mx-auto my-20 rounded-2xl bg-base-white p-6 max-w-[660px]",
    className
  );
  const wrapClassName = clx(
    "fixed inset-0 z-[999] hidden h-screen w-screen overflow-auto bg-base-black bg-opacity-75",
    isOpen && "block"
  );

  return (
    <Portal>
      <div className={wrapClassName}>
        <div className={classes} ref={modalRef}>
          <div className="relative z-10 flex justify-between">
            <div className={""}>
              <div className="font-medium text-base-white">{title}</div>
            </div>
              <ButtonClose
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-md font-bold text-base-black"
                onClick={close}
              />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};
