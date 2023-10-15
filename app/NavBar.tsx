"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <div className="flex space-x-6 border-b mb-5 px-5 h-16 items-center ">
      <Link href="/" className="h-4">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
                className={classNames({
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                    "hover:text-zinc-900 transition-colors": true
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
