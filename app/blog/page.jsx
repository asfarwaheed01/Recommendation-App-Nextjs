import React from "react";

const page = () => {
  return (
    <div className="max-w-lg w-full p-0 auto rounded-lg shadow-md mx-auto italic relative">
      <section className="section-1 h-auto bg-[#D9D9D9]">
        <div className="w-[90%] mx-auto">
          <div className="heading pt-[20px]">
            <h1 className="text-black text-[25px] mx-auto font-extrabold">
              Find out the best movie for you to watch tonight
            </h1>
            <p className="text-[14px] text-gray-700 w-[50%] ml-[15%] mt-3">
              3 minutes lecture
            </p>
          </div>
          <div className="intro w-[90%] mx-auto mt-[30px] mb-[30px] flex justify-center">
            <span className="text-[#DE2C5C] font-bold">|</span>
            <p className="text-[15px] font-semibold text-[#DE2C5C] text-center mr-4 ml-4">
              Intro
            </p>
            <span className="text-[#DE2C5C] font-bold">|</span>
            <p className="text-[15px] font-semibold text-[#DE2C5C] text-center mr-4 ml-4">
              Story
            </p>
            <span className="text-[#DE2C5C] font-bold">|</span>
            <p className="text-[15px] font-semibold text-[#DE2C5C] text-center mr-4 ml-4">
              Climax
            </p>
            <span className="text-[#DE2C5C] font-bold">|</span>
            <p className="text-[15px] font-semibold text-[#DE2C5C] text-center ml-4 mr-4">
              End
            </p>
            <span className="text-[#DE2C5C] font-bold">|</span>
          </div>
          <div className="paras">
            <p className="text-black font-bold text-[20px] leading-relaxed">
              Know Yourself is the brainchild of a group of dreamers, led by a
              founder passionate about making a positive impact through
              technology, and brought to life by Sid, a developer who
              transformed this vision into reality.{" "}
            </p>
            <p className="text-black font-normal leading-relaxed text-[20px] text-left mt-[4%]">
              Born from personal struggles with decision-making, our app
              leverages AI to simplify choices, embodying our core values of
              contributing to the greater good and supporting our users
              unconditionally.
            </p>
          </div>
          <div className="popcorn">
            <img
              src="assets/popcorn.png"
              alt=""
              className="object-cover w-full h-full my-5"
            />
          </div>
          <div className="aparas">
            <p className="text-black text-[20px] leading-relaxed">
              Know Yourself is the brainchild of a group of dreamers, led by a
              founder passionate about making a positive impact through
              technology, and brought to life by Sid, a developer who
              transformed this vision into reality.{" "}
            </p>
            <p className="text-black font-normal leading-relaxed text-[20px] text-left mt-[4%] pb-[30px]">
              Born from personal struggles with decision-making, our app
              leverages AI to simplify choices, embodying our core values of
              contributing to the greater good and supporting our users
              unconditionally.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
