import React from "react";
import Link from "next/link";

const Footer = ({ className }) => {
  return (
    <footer className={` bottom-0 shadow-lg w-full ${className}`}>
      <div className="footer flex justify-between px-5 py-5 items-center">
        <h2 className="text-[20px] italic font-extrabold">
          Know <br /> Yourself
        </h2>
        <div className="f-links">
          <ul className="flex items-center gap-2 text-white text-[14px] font-bold">
            <li className="border border-white border-1 rounded-lg px-4">
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
      </div>
    </footer>
  );
};

export default Footer;
