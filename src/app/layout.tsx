import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { clx } from "../utils/helpers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Share Youtube Video App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  actions,
}: Readonly<{
  children: React.ReactNode;
  actions: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clx("relative", inter.className)}>
        <Providers>
          <ToastContainer />
            <Navbar />
            <div className="container relative mx-auto">
              {children}
              {actions}
            </div>
            <Footer />
        </Providers>
      </body>
    </html>
  );
}