"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Raleway, League_Spartan } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { FiLogIn, FiSkipForward, FiLock } from "react-icons/fi";
import { SignInButton, useAuth, RedirectToSignUp } from "@clerk/nextjs";

const raleway = Raleway({ subsets: ["latin"] });
const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export default function HomePage() {
  const router = useRouter();
  const [signUpScreen, setSignUpScreen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/ask");
    }
  }, [isSignedIn, router]);

  const skip = () => {
    return router.push("/ask");
  };

  const redirectToSignUp = () => {
    setSignUpScreen(true);
  };

  return (
    <main className="flex flex-col items-center w-full h-screen overflow-auto">
      <p
        className={twMerge(
          "flex pt-24 pb-20 justify-center items-center text-secondary w-10 text-7xl sm:text-8xl break-normal text-center font-bold",
          leagueSpartan.className
        )}
      >
        Know yourself
      </p>
      <div className="flex flex-col justify-center items-center pb-20 max-w-md">
        <p
          className={twMerge(
            "text-4xl sm:text-5xl p-5 max-w-xs sm:max-w-lg text-center leading-[50px] sm:leading-[60px]",
            raleway.className
          )}
        >
          Better Choices <br /> Easier
          <br /> For Everyone
        </p>
      </div>
      <div className="flex gap-5 p-5 pb-20">
        <button
          className="flex gap-2 items-center justify-center border border-white rounded-md p-3 hover:bg-white hover:text-black transition-all h-[50px] cursor-pointer"
          onClick={() => redirectToSignUp()}
        >
          Signup <FiLogIn />
        </button>
        {signUpScreen && <RedirectToSignUp />}
        <SignInButton afterSignInUrl="/ask">
          <div className="flex gap-2 items-center justify-center border border-white rounded-md p-3 hover:bg-white hover:text-black transition-all h-[50px] cursor-pointer">
            Signin <FiLogIn />
          </div>
        </SignInButton>
        <button
          className="flex gap-2 items-center justify-center border bg-gray-700 border-white rounded-md p-3 transition-all h-[50px]"
          onClick={skip}
          disabled={true}
        >
          Use as Guest <FiLock />
        </button>
      </div>
    </main>
  );
}
