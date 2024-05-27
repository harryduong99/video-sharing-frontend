import { clx } from "@/utils/helpers";

interface ButtonPrimaryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}


export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  className,
  onClick,
  ...otherProps
}) => {
  const classes = clx(
    "btn-base border border-primary bg-primary shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-400",
    className
  );

  return (
    <button onClick={onClick} className={classes} {...otherProps}>
      {children}
    </button>
  );
};
