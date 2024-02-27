// components/Layout.jsx

import React from "react";
import Homefooter from "@/components/homefooter";
import Homenav from "@/components/homenav";

const Layout = ({ children }) => {
  return (
    <div className="max-w-lg w-[430px] p-0 auto rounded-lg shadow-md mx-auto italic relative">
      <Homenav className="bg-[#41436C]" />
      {children}
      <Homefooter className="bg-[#41436C]" />
    </div>
  );
};

export default Layout;
