import { clx } from "@/utils/helpers";

interface Props extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  color?: string;
  opacity?: string;
  strokeWidth?: string;
}

export const ArrowLeftIcon: React.FC<Props> = ({
  children,
  className,
  contentClassName,
  strokeWidth = "2",
  opacity = "1",
  color = "#F8FFFE",
  ...otherProps
}) => {
  return (
    <>
      <svg
        className={clx("icon-base", className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        {...otherProps}
      >
        <path
          className={contentClassName}
          d="M19 12H5M5 12L12 19M5 12L12 5"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={opacity}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </>
  );
};

export const ArrowRightIcon: React.FC<Props> = ({
  children,
  className,
  contentClassName,
  color = "#737373",
  opacity = "1",
  strokeWidth = "1.5",
  ...otherProps
}) => {
  return (
    <>
      <svg
        className={clx("icon-base", className)}
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...otherProps}
      >
        <g id="arrow-right" opacity={opacity}>
          <path
            className={contentClassName}
            id="Icon"
            d="M3.125 8H11.875M11.875 8L7.5 3.625M11.875 8L7.5 12.375"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      {children}
    </>
  );
};

export const HamburgerMenuIcon: React.FC<Props> = ({
  children,
  className,
  contentClassName,
  color = "#F8FFFE",
  opacity = "1",
  strokeWidth = "2",
  ...otherProps
}) => {
  return (
    <>
      <svg
        className={clx("icon-base", className)}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...otherProps}
      >
        <g id="hamburger" opacity={opacity}>
          <path
            className={contentClassName}
            d="M11 20H29M11 14H29M11 26H29"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      {children}
    </>
  );
};
