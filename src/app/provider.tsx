"use client";

import { useEffect, useState } from "react";
import { AppContextWrapper } from "./contexts/state";
import AuthProvider from "./contexts/auth";
import SocketContextProvider from "./contexts/socket";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <AppContextWrapper>
        <SocketContextProvider>
          <AuthProvider>{mounted && <>{children}</>}</AuthProvider>
        </SocketContextProvider>
      </AppContextWrapper>
    </>
  );
}
