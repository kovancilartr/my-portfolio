import Link from 'next/link'
import React from 'react'

interface NavItemProps {
    href: string;
    title: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const NavItem = ({ href, title, onClick }: NavItemProps) => {
  return (
    <Link href={href} className='block py-2 pl-3' onClick={onClick}>
      {title}
    </Link>
  )
}

export default NavItem