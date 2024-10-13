"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { ModeToggle } from "../ModeToggle";
import { useSession, signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";

interface NavbarProps {
  navLinks: {
    name: string;
    path: string;
  }[];
  logoutProps: boolean;
}
const Navbar = ({ navLinks, logoutProps }: NavbarProps) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { data: session } = useSession(); // Oturum bilgilerini al

  const handleLogout = async () => {
    await signOut(); // Oturumu kapat
    revalidatePath("/"); // Ana sayfayı yenileyin
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bgOne bg-opacity-85 textOne shadow-md shadow-slate-400 rounded-b-full">
      <div className="flex items-center justify-between px-52 py-2">
        <Link
          href="/"
          className="text-xl md:text-2xl font-semibold font-pacifico"
        >
          Kovancılar
        </Link>

        <div className="hidden md:block md:w-auto">
          <ul className="flex md:space-x-5 md:flex-row">
            {navLinks
              .filter((link) => (session ? link.name !== "Giriş" : true))
              .map((link, index) => (
                <li key={index} className="inline-block">
                  <NavItem href={link.path} title={link.name} />
                </li>
              ))}
            {session?.user.role === "Admin" && (
              <li className="inline-block">
                <NavItem href="/admin/dashboard" title="Admin" />
              </li>
            )}
            {session && logoutProps && (
              <li className="inline-block">
                <NavItem href="#" title="Çıkış" onClick={handleLogout} />
              </li>
            )}
            <ModeToggle />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
