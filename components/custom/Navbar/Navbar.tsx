"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { ModeToggle } from "../ModeToggle";

const NavLinks = [
  {
    name: "Ana Sayfa",
    path: "/",
  },
  {
    name: "Hakkımda",
    path: "#about",
  },
  {
    name: "Projeler",
    path: "#projects",
  },
  {
    name: "İletişim",
    path: "#contact",
  },
  {
    name: "Giriş",
    path: "/auth/login",
  },
];
const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

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
            {NavLinks.map((link, index) => (
              <li key={index} className="inline-block">
                <NavItem href={link.path} title={link.name} />
              </li>
            ))}
            <ModeToggle />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
