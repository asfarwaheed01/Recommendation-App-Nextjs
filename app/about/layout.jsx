// components/Layout.jsx

import React from "react";
import Footer from "@/components/Footer";
import Homenav from "@/components/Homenav";

const Layout = ({ children }) => {
  return (
    <div className="max-w-lg w-full p-0 auto rounded-lg shadow-md mx-auto italic relative">
      <Homenav className="bg-[#745048]" />
      {children}
      <Footer className="bg-[#745048]" />
    </div>
  );
};

export default Layout;