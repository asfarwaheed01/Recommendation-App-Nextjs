import React from "react";
import Link from "next/link";

const Homenav = ({ className }) => {
  return (
    <nav
      className={`navbar flex w-full h-auto items-center justify-between px-1 py-3 shadow-lg z-20 ${className}`}
    >
      <div className="logo flex items-center w-[40%]">
        <img src="/assets/logo.png" alt="Logo" />
        <p className="text-[13px] text-white italic font-normal">
          <Link href="/"> Try Know Yourself! </Link>
        </p>
      </div>

      <div className="menu w-[60%] flex justify-end">
        <ul className="flex items-center gap-2 text-white text-[12px] font-bold">
          <li className="border border-white border-1 rounded-lg px-3">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="border border-white border-1 rounded-lg px-1">
            <Link href="/about">About us</Link>
          </li>
          <li className="border border-white border-1 rounded-lg px-1">
            <Link href="/contact">Contact us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Homenav;
