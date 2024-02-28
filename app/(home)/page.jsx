"use client";
import { useState } from "react";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";

const Page = () => {
  //feedback
  const [email, setEmail] = useState("");

  const { trigger: triggerSubmit, isMutating: isLoading } = useSWRMutation(
    `/api/sendemail`,
    (url) => {
      return axios.post(url, {
        email,
      });
    },
    {
      onSuccess: () => {
        setEmail("");
        toast.success("Email sent");
      },
      onError: () => {
        toast.error("Failed to send Email");
      },
    }
  );

  const sendEmail = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      toast.error("Please enter your Email.");
      return;
    }
    triggerSubmit();
  };

  return (
    <div className="max-w-lg w-full p-0 auto rounded-lg shadow-md mx-auto italic relative">
      {/* section1 */}
      <section className="sec-1 h-[605px] relative">
        <img
          src="/assets/Background.png"
          alt="background-image"
          className="w-full h-full object-cover"
        />
        <div className="know-yourself flex absolute top-[25%] justify-center w-full">
          <img src="/assets/know.png" alt="" className="w-[300px] h-[136px]" />
        </div>
        <div className="form1 absolute bottom-[10%]">
          <form
            onSubmit={sendEmail}
            action=""
            className="blurry-background border border-white border-1 w-[80%] mx-auto px-[20px] py-[30px] rounded-3xl bg-white bg-opacity-80"
          >
            <div className="form-text flex items-center mb-5">
              <p className="italic text-[21px] text-black w-[80%] font-titan">
                Subscribe to emails for immediate Beta access
              </p>
              <p className="italic text-[#DE2C5C] text-[24px] font-bold">
                Free
              </p>
            </div>
            <div className="form-input relative">
              <input
                type="email"
                className="w-[90%] p-3 rounded-full text-black border-none placeholder-gray-600"
                placeholder="your@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-full py-3 px-8 bg-[#41436C] absolute right-0"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* Section2 */}
      <section className="h-auto bg-[#41436C] py-[10%] overflow-hidden shadow-2xl">
        <div className="rounded-full px-3 py-3 border-black border-2 ml-[-7%] pl-[10%] w-[80%]">
          <img src="assets/green.png" alt="" className="mx-auto" />
        </div>
        <div className="launch text-left pt-[4%] mb=[20px]">
          <p className=" leading-11 pl-5 text-[36px] font-titan">
            We are launching our crowdfunding campaign on Feb 27!
          </p>
        </div>
        <div className="rounded-full py-[10px] px-[50px] border-black border-2 w-[60%] float-right mr-[-40px] mt-[5%]">
          <img src="assets/indiegogo.png" alt="" className="mx-auto" />
        </div>
        <div className="text-right mt-[20%]">
          <p className="text-[36px] pr-5 font-titan">
            Please support <br /> to bring <br /> Know Yourself <br /> to
            everyone
          </p>
        </div>
        <div className="form2 mt-[10%]">
          <form
            action=""
            className="blurry-background border border-white border-1 w-[80%] mx-auto px-[15px] py-[10px] rounded-3xl bg-white bg-opacity-80"
          >
            <div className="form-text flex items-center mb-5 justify-center">
              <p className="italic text-[18px] text-black w-[80%] text-center font-titan">
                Subscribe to emails to support our Crowdfunding campaign
              </p>
            </div>
            <div className="form-input relative">
              <input
                type="email"
                className="w-[90%] p-3 rounded-full text-black border-none placeholder-gray-600"
                placeholder="your@gmail.com"
              />
              <button className="rounded-full py-3 px-8 bg-[#41436C] absolute right-1">
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* section-1 */}
      <section className="section-3 h-[550px] flex justify-center relative">
        <div className="w-full flex justify-center">
          <img src="assets/phone.png" alt="" className="h-full" />
        </div>
        <div className="text-3 absolute top-20 left-5">
          <h1 className="text-[33px] text-black leading-11 italic font-titan">
            Better Choices <br /> Easier <br /> For Everyone
          </h1>
        </div>
        <div className="icons w-[40%] absolute top-[50%] left-5 text-center">
          <p className="text-black italic text-[20px]">
            Watch a bit more <br /> below
          </p>
          <div className="social-icons flex justify-center gap-5 mt-5">
            <a href="">
              <img src="assets/tiktok.png" alt="" />
            </a>
            <a href="">
              <img src="assets/Instagram_icon 1.png" alt="" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
