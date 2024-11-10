"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLink = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={link.href === currentPath ? "text-slate-200" : "nav-link"}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLink;
