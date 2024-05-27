import { clx } from "@/utils/helpers";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
  wrapClassName?: string;
  rootClassName?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

export const Dropdown: React.FC<Props> = ({
  children,
  className,
  wrapClassName,
  rootClassName,
  setOpen,
  open,
  trigger,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dropdownRef}
      className={clx("relative cursor-pointer", rootClassName)}
    >
      {trigger}
      {open && (
        <div className={wrapClassName} ref={contentRef}>
          <div className={className}>{children}</div>
        </div>
      )}
    </div>
  );
};