import React from "react";

const page = () => {
  return (
    <section className="max-w-lg w-full p-0 auto shadow-md mx-auto italic relative bg-[#745048]">
      <div className="w-[90%] mx-auto">
        <h1 className="text-black text-[64px] leading-tight text-left font-extrabold">
          Better <br /> Choices <br /> Easier <br /> For <br /> Everyone
        </h1>
      </div>
      <div className="sec-2">
        <img
          src="/assets/about-sec-2.png"
          alt=""
          className="object-cover w-full"
        />
      </div>
      <div className="sec-3">
        <img src="/assets/about-2.png" alt="" className="w-full object-cover" />
      </div>
    </section>
  );
};

export default page;
