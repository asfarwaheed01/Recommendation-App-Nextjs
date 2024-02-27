import React from "react";
import Link from "next/link";

export default function Homenav({ className }) {
  return (
    <nav
      className={`navbar flex w-full h-auto items-center justify-between px-2 py-3 shadow-lg z-20 ${className}`}
    >
      <div className="logo flex items-center w-[40%]">
        <Link href="/">
          <img src="/assets/logo.png" alt="Logo" />
        </Link>
        <p className="text-[13px] text-white italic font-normal">
          <Link href="/home"> Try Know Yourself! </Link>
        </p>
      </div>

      <div className="menu w-[60%] flex justify-end">
        <ul className="flex items-center gap-2 text-white text-[12px] font-bold">
          <li className="border border-white border-1 rounded-lg px-3">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="border border-white border-1 rounded-lg px-1 hidden">
            <Link href="/about">About us</Link>
          </li>
          <li className="border border-white border-1 rounded-lg px-1">
            <Link href="/contact">Contact us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
