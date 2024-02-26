"use client";

import Modal from "@/components/modal";
import { RedirectToSignIn, SignedOut, RedirectToSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";

export default function SigninModal({ setIsModalOpen }) {
  const [isModalClicked, setIsModalClicked] = useState(false);
  const [isClickedSignUp, setIsClickedSignUp] = useState(false);

  return (
    <SignedOut>
      <Modal
        title="Know Yourself"
        description="Access to more when you log in"
        modalButtonText="Log In"
        modalButtonText1="Sign Up"
        modalButtonText2="Be Guest"
        onModalClick2={() => setIsModalOpen(false)}
        onModalClick1={() => setIsClickedSignUp(true)}
        onModalClick={() => setIsModalClicked(true)}
        ModalButtonIcon={FiLogIn}
      />
      {isModalClicked && <RedirectToSignIn />}
      {isClickedSignUp && <RedirectToSignUp />}
    </SignedOut>
  );
}
