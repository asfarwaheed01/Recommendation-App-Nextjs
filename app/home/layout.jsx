// components/Layout.jsx

import React from "react";
import Homefooter from "@/components/Footer";
import Homenav from "@/components/Homenav";

const Layout = ({ children }) => {
  return (
    <div className="max-w-lg w-full p-0 auto rounded-lg shadow-md mx-auto italic relative">
      <Homenav className="bg-[#41436C] absolute" />
      {children}
      <Homefooter className="bg-[#41436C] absolute" />
    </div>
  );
};

export default Layout;
