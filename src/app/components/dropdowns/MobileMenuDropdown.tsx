import { useAuth } from "@/app/contexts/auth";
import { clx } from "@/utils/helpers";
import Link from "next/link";
import { ButtonPrimary } from "../buttons/Button";
import { HamburgerMenuIcon } from "../icons/Icon";
import { Dropdown } from "./Dropdown";

interface Props {
  children?: React.ReactNode;
  className?: string;
  isOpen: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MobileMenuDropdown: React.FC<Props> = ({
  children,
  className,
  isOpen = false,
  setOpenMenu,
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <Dropdown
      className={clx("p-0 md:hidden", className)}
      wrapClassName="absolute w-full left-0 top-full shadow-lg"
      rootClassName="static"
      setOpen={setOpenMenu}
      open={isOpen}
      trigger={
        <>
          {!isOpen ? (
            <div
              className="flex items-center justify-center"
              onClick={() => setOpenMenu(true)}
            >
              <HamburgerMenuIcon className="md:hidden h-10 w-10 cursor-pointer" />
            </div>
          ) : (
            <div
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-base-white text-xl lg:hidden"
              onClick={() => setOpenMenu(false)}
            >
              &#x2715;
            </div>
          )}
        </>
      }
    >
      <div className="mobile-nav-animate z-50 text-base-black text-sm w-full left-0 bg-base-white top-[73px] duration-[0.3s">
        <div className="p-6">
          {!isAuthenticated() ? (
            <Link href={"/login"}>
              <ButtonPrimary>Login</ButtonPrimary>
            </Link>
          ) : (
            <>
              <div className="mb-4">
                <span className="font-medium text-lg">
                  Welcome {user?.email}
                </span>
              </div>
              <Link href={"/share"}>
                <ButtonPrimary className="mb-4">Share Video</ButtonPrimary>
              </Link>
              <ButtonPrimary onClick={logout}>Logout</ButtonPrimary>
            </>
          )}
        </div>
      </div>
      {children}
    </Dropdown>
  );
};
