"use client";

import { clx } from "@/utils/helpers";
import Link from "next/link";
import { ButtonPrimary } from "./buttons/Button";
import { useAuth } from "../contexts/auth";
import { MobileMenuDropdown } from "./dropdowns/MobileMenuDropdown";
import { useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpenMobileNav, setIsOpenMobileNav] = useState<boolean>(false);

  return (
    <nav className={clx("container mx-auto sticky top-0 z-50 bg-primary-400")}>
      <div className="flex flex-wrap lg:justify-normal justify-between w-full items-center px-6 py-4">
        <div className="md:flex h-10 md:w-1/3 hidden">
          <p className="text-3xl font-medium text-base-white">Videos</p>
        </div>
        <div className="md:flex hidden lg:w-2/3 justify-end items-center">
          {!isAuthenticated() ? (
            <Link className="open-login" href={"/login"}>
              <ButtonPrimary>Login</ButtonPrimary>
            </Link>
          ) : (
            <>
              <div className="email-welcome mr-4 text-base-white">
                Welcome <span className="font-bold">{user?.email}</span>
              </div>
              <Link className="mr-2" href={"/share"}>
                <ButtonPrimary>Share Video</ButtonPrimary>
              </Link>
              <ButtonPrimary onClick={logout}>Logout</ButtonPrimary>
            </>
          )}
        </div>
        <MobileMenuDropdown
          isOpen={isOpenMobileNav}
          setOpenMenu={setIsOpenMobileNav}
        />
      </div>
    </nav>
  );
};

export default Navbar;
