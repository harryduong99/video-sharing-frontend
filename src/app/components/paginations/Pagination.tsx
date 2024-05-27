import { clx } from "@/utils/helpers";
import { ButtonPrimary } from "../buttons/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons/Icon";

interface Props {
  children?: React.ReactNode;
  className?: string;
  page?: number;
  totalPages?: number;
  onChangePage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  className,
  children,
  page = 1,
  totalPages = 1,
  onChangePage,
}) => {
  return (
    <div className={clx("flex gap-x-4 items-center justify-end", className)}>
      <ButtonPrimary
        className="w-9 h-9 p-0"
        disabled={page <= 1}
        onClick={() => onChangePage(page - 1)}
      >
        <ArrowLeftIcon color="#fff" />
      </ButtonPrimary>
      <span className="text-sm">
        Page {page} of {totalPages}
      </span>
      <ButtonPrimary
        className="w-9 h-9 p-0"
        disabled={page >= totalPages}
        onClick={() => onChangePage(page + 1)}
      >
        <ArrowRightIcon color="#fff" />
      </ButtonPrimary>
      {children}
    </div>
  );
};
