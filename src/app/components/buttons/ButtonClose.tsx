import { clx } from "@/utils/helpers";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  color?: string;
  theme?: string;
}

export const ButtonClose: React.FC<Props> = ({
  children,
  className,
  onClick,
  ...otherProps
}) => {

  return (
    <button onClick={onClick} className={clx("text-base-black hover:bg-gray-300", className)} {...otherProps}>
      &#x2715;
      {children}
    </button>
  );
};
