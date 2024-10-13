"use client";
import Link from "next/link";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const MiniNavbar = () => {
  return (
    <div className="flex justify-center w-1/2 mx-auto my-4">
      <Menubar className="w-full justify-center rounded-xl">
        <Link href="/admin/dashboard/">Dashboard</Link>

        <MenubarMenu>
          <MenubarTrigger>Site Ayarları</MenubarTrigger>
          <MenubarContent>
            <MenubarItem inset>
              <Link href="/admin/dashboard/hero">Hero Bölümü</Link>
            </MenubarItem>
            <MenubarItem inset>
              <Link href="/admin/dashboard/projects">Projeler Bölümü</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default MiniNavbar;
