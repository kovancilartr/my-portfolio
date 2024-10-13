import Navbar from "@/components/custom/Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import React from "react";
import MiniNavbar from "../_components/MiniNavbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}
const NavLinks = [
  {
    name: "Ana Sayfa",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex w-full h-screen flex-col bgOne textOne">
      <SessionProvider>
        <Navbar navLinks={NavLinks} logoutProps={false} />
        <div className="mt-14 h-full">
          <MiniNavbar />
          <div className="container flex mx-auto items-center flex-col h-fit">
            {children}
          </div>
        </div>
      </SessionProvider>
    </div>
  );
};

export default AdminLayout;
