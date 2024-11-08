import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-5 border-b-1 p-3 items-center">
      <Link href="/"><FaBug /></Link>
      <ul className="flex space-x-3">
        {links.map((link) => (
          <Link
            className="text-slate-500 hover:text-slate-200 transition-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar