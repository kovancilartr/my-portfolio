import React from "react";
import NavItem from "./NavItem";

interface MobileMenuProps {
  links: [];
}

const MobileMenu = ({ links }: MobileMenuProps) => {
  return (
    <ul className="flex flex-col p-4 items-center">
      {links.map((link: { path: string; name: string }, index: number) => (
        <li key={index}>
          <NavItem href={link.path} title={link.name} />
        </li>
      ))}
    </ul>
  );
};

export default MobileMenu;
