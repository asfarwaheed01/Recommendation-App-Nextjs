import React from "react";

const page = () => {
  return (
    <section className="max-w-lg w-full p-0 auto shadow-md mx-auto italic relative bg-[#48826A]">
      <div className="w-[90%] mx-auto text-black pt-[5%]">
        <div className="connect">
          <h1 className="font-extrabold text-[24px]">Connect & Contribute</h1>
          <p className="text-black text-[24px] leading-relaxed pt-[2%]">
            <strong>We value every voice and every idea.</strong> Whether
            you&apos;re looking to <strong> connect, contribute,</strong> or
            <strong>create</strong> with us, your insights help us grow and
            <strong> Explore </strong> our <strong> FAQs</strong>, reach out
            through our <strong>contact form</strong>, or follow us on
            <strong> social media</strong>.
          </p>
        </div>
        <div className="work pt-[7%]">
          <h1 className="font-extrabold text-[24px]">Work with us!</h1>
          <p className="leading-relaxed text-[24px] pt-4">
            If you love this project, we would love to have you on board!
          </p>
          <div className="work-images flex justify-center gap-4 py-10">
            <img src="assets/group 17.png" alt="" className="w-[45%]" />
            <img src="assets/group 18.png" alt="" className="w-[45%]" />
          </div>
        </div>
        <div className="faq py-5">
          <h1 className="font-extrabold mb-10">FAQ Section</h1>
          <div className="questions bg-white px-7 py-5 text-black rounded-3xl overflow-auto max-h-[300px]">
            <hr className="my-2 border-t-2 border-black" />
            <p className="mb-2 text-base leading-7">How can I support...</p>
            <hr className="my-2 border-t-2 border-black" />
            <p className="mb-2 text-base leading-7">What is the app for?</p>
            <p className="mb-2 text-sm leading-7">
              For Empowering better decisions and personal growth through
              intuitive, AI-driven insights. We Will basically help you out with
              your decision making
            </p>
            <hr className="my-2 border-t-2 border-black" />
            <p className="mb-2 text-base leading-7">How can I support...</p>
            <hr className="my-2 border-t-2 border-black" />
            <p className="mb-2 text-base leading-7">Hi...</p>
            <hr className="my-2 border-t-2 border-black" />
          </div>
        </div>
        <div className="contactform py-5 text-black italic">
          <h1 className="font-extrabold text-[24px] mb-[30px]">
            Contact Form Section
          </h1>
          <form action="" className="rounded-3xl bg-white px-5 py-3 relative">
            <h1 className="text-2xl font-bold bg-[#858080] text-black py-2 px-2 rounded-t-3xl absolute top-0 left-0 w-[100%]">
              Get in Touch
            </h1>
            <div className="input1 flex items-center mb-4 justify-between w-80% mt-[12%]">
              <label htmlFor="reason" className="mr-3 font-bold w-1/3">
                Reason of Contact:
              </label>
              <select
                id="reason"
                className="rounded-2xl bg-[#D8573E] text-black px-2 py-1 w-2/3"
              >
                <option value="option1 w-2/3">Option 1</option>
                <option value="option2 w-2/3">Option 2</option>
                <option value="option3 w-2/3">Option 3</option>
              </select>
            </div>
            <div className="input1 flex items-center mb-4 justify-between w-80%">
              <label htmlFor="name" className="mr-3 font-bold w-1/3">
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                className="rounded-2xl border border-gray-300 px-2 py-1 w-2/3"
                placeholder="Your Name"
              />
            </div>
            <div className="input1 flex items-center mb-4 justify-between w-80%">
              <label htmlFor="email" className="mr-3 font-bold w-1/3">
                Your Email:
              </label>
              <input
                type="email"
                id="email"
                className="rounded-2xl border border-gray-300 px-2 py-1 w-2/3"
                placeholder="Your Email"
              />
            </div>
            <div className="input1 flex mb-4 justify-between w-80%">
              <label htmlFor="message" className="mr-3 font-bold w-1/3">
                Your Message:
              </label>
              <textarea
                id="message"
                className="rounded-2xl border border-gray-300 px-2 py-1 w-2/3"
                placeholder="Your Message"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button className="w-[30%] bg-[#D8573E] rounded-2xl text-white font-bold py-2 shadow-lg">
                Send !
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
