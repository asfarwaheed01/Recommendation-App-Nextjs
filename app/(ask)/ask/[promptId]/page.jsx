"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import toast from "react-hot-toast";
import { Inika, Inter } from "next/font/google";
import { useAuth } from "@clerk/nextjs";

import Spinner from "./_components/spinner";
import ErrorMessage from "./_components/error-message";
import SubmitButton from "./_components/submit-button";
import UtilityButtons from "./_components/utility-buttons";
import Feedback from "./_components/feedback";
import AnswerLevel from "./_components/answer-level";
import ChoiceQuestion from "./_components/choice-question";
import InputQuestion from "./_components/input-question";
import SigninModal from "./_components/signin-modal";

const inikaFont = Inika({ subsets: ["latin"], weight: ["400"] });
const interFont = Inter({ subsets: ["latin"] });

const PROMPT_TO_LIGHT_CLASS_MAP = {
  red: "bg-red-light",
  blue: "bg-blue-light",
  yellow: "bg-yellow-light",
};

const PROMPT_TO_MEDIUM_CLASS_MAP = {
  red: "bg-red-medium",
  blue: "bg-blue-medium",
  yellow: "bg-yellow-medium",
};

const PROMPT_TO_DARK_CLASS_MAP = {
  red: "bg-red-dark",
  blue: "bg-blue-dark",
  yellow: "bg-yellow-dark",
};

const PROMPT_TO_DARKEST_CLASS_MAP = {
  red: "bg-red-darkest",
  blue: "bg-blue-darkest",
  yellow: "bg-yellow-darkest",
};

const BORDER_COLOR_MAP = {
  red: "border-red-darkest",
  blue: "border-blue-darkest",
  yellow: "border-yellow-darkest",
};

const fetcher = async (url) => axios.post(url).then((res) => res.data);

export default function PromptFormPage({ params }) {
  const { promptId } = params;

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("promptId")) !== promptId) {
      sessionStorage.clear();
      sessionStorage.setItem("promptId", JSON.stringify(promptId));
    }
  }, [promptId]);

  const { isSignedIn } = useAuth();

  const [answerLevel, setAnswerLevel] = useState("");
  const [answers, setAnswers] = useState();
  const [aiResponses, setAiResponses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let storedAnswerLevel = sessionStorage.getItem("answerLevel");
    if (storedAnswerLevel) {
      setAnswerLevel(storedAnswerLevel);
    }

    let storedResponses = sessionStorage.getItem("aiResponses");
    if (storedResponses) {
      storedResponses = JSON.parse(storedResponses);
      setAiResponses([...storedResponses]);
    }

    let storedAnswers = sessionStorage.getItem("answers");
    if (storedAnswers) {
      storedAnswers = JSON.parse(storedAnswers);
      setAnswers([...storedAnswers]);
    } else {
      setAnswers([
        { type: "", value: "" },
        { type: "", value: "" },
        { type: "", value: "" },
        { type: "", value: "" },
        { type: "", value: "" },
        { type: "", value: "" },
        { type: "", value: "" },
        { type: "", value: "" },
      ]);
    }
  }, []);

  const {
    data: promptData,
    error,
    isLoading,
  } = useSWR(`/api/prompt?promptId=${promptId}`, fetcher, {
    onSuccess: (data) => {
      if (!sessionStorage.getItem("answerLevel")) {
        const firstAnswerLevel = data?.answerLevel?.choices?.[0];
        setAnswerLevel(firstAnswerLevel);
        sessionStorage.setItem("answerLevel", firstAnswerLevel);
      }
    },
  });

  const {
    trigger: triggerSubmit,
    data: aiData,
    isMutating: isAILoading,
  } = useSWRMutation(
    `/api/ai`,
    (url) => {
      const processedAnswers = answers.map((answer) => {
        if (answer.value.split(".")[1]?.trim()) {
          return { ...answer, value: answer.value.split(".")[1]?.trim() };
        } else if (answer.value.split(")")[1]?.trim()) {
          return { ...answer, value: answer.value.split(".")[1]?.trim() };
        } else {
          return { ...answer, value: answer.value.trim() };
        }
      });
      return axios.post(url, {
        promptId,
        answers: processedAnswers,
        aiResponses,
      });
    },
    {
      onSuccess: (data) => {
        setAiResponses((prev) => [...prev, data?.data?.content]);
        sessionStorage.setItem(
          "aiResponses",
          JSON.stringify([...aiResponses, data?.data?.content])
        );
      },
    }
  );

  const askAI = () => {
    setTimeout(() => {
      if (!isSignedIn) {
        setIsModalOpen(true);
      }
    }, 40000);

    if (isModalOpen) {
      return;
    }

    for (let i = 0; i < answers.length; i++) {
      if (answerLevel === promptData?.answerLevel?.choices?.[0] && i > 3) {
        break;
      }
      if (answers[i].value === "") {
        toast.error("Please answer all the questions.");
        return;
      }
    }
    triggerSubmit();
  };

  if (error) {
    return (
      <ErrorMessage
        lightColorMap={PROMPT_TO_LIGHT_CLASS_MAP}
        color={promptData?.color}
      />
    );
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div
      className={twMerge(
        "p-2 rounded-[10px] m-5",
        PROMPT_TO_LIGHT_CLASS_MAP[promptData?.color]
      )}
    >
      {isModalOpen && <SigninModal setIsModalOpen={setIsModalOpen} />}
      <div
        className={twMerge(
          "flex flex-col text-white w-full h-full p-2 overflow-auto max-w-3xl border-2 rounded-3xl",
          BORDER_COLOR_MAP[promptData?.color],
          PROMPT_TO_LIGHT_CLASS_MAP[promptData?.color],
          interFont.className
        )}
      >
        <p
          className={twMerge(
            "text-center text-2xl pt-3 pb-1",
            inikaFont.className
          )}
        >
          {promptData?.label}
        </p>
        <AnswerLevel
          mediumColorMap={PROMPT_TO_MEDIUM_CLASS_MAP}
          darkColorMap={PROMPT_TO_DARK_CLASS_MAP}
          darkestColorMap={PROMPT_TO_DARKEST_CLASS_MAP}
          color={promptData?.color}
          question={promptData?.answerLevel}
          selectedChoice={answerLevel}
          setSelectedChoice={setAnswerLevel}
        />
        {promptData?.questions?.map((question, index) => {
          if (answerLevel === "Broad" && index > 3) {
            return null;
          }

          return question.category == "Choice" ? (
            <ChoiceQuestion
              key={question._id}
              questionNumber={question.questionId}
              mediumColorMap={PROMPT_TO_MEDIUM_CLASS_MAP}
              darkColorMap={PROMPT_TO_DARK_CLASS_MAP}
              color={promptData?.color}
              question={question}
              answers={answers}
              setAnswers={setAnswers}
            />
          ) : (
            <InputQuestion
              key={question._id}
              questionNumber={question.questionId}
              mediumColorMap={PROMPT_TO_MEDIUM_CLASS_MAP}
              color={promptData?.color}
              question={question}
              answers={answers}
              setAnswers={setAnswers}
            />
          );
        })}

        {aiResponses.length === 0 && (
          <SubmitButton
            askAI={askAI}
            isLoading={isAILoading}
            darkColorMap={PROMPT_TO_DARK_CLASS_MAP}
            color={promptData?.color}
          />
        )}
        <div
          className={twMerge(
            "flex flex-col text-white text-lg w-full h-full p-2 overflow-auto max-w-3xl",
            PROMPT_TO_LIGHT_CLASS_MAP[promptData?.color]
          )}
        >
          {aiResponses.map((response, index) => (
            <div
              key={index}
              className={twMerge(
                "p-2 my-2 rounded-xl",
                PROMPT_TO_MEDIUM_CLASS_MAP[promptData?.color]
              )}
            >
              <p className="text-center">{response}</p>
            </div>
          ))}
          <UtilityButtons
            color={promptData?.color}
            darkColorMap={PROMPT_TO_DARK_CLASS_MAP}
            askAI={askAI}
            isLoading={isAILoading}
            aiResponses={aiResponses}
            setIsSiginModalOpen={setIsModalOpen}
          />
        </div>
        <Feedback
          lightColorMap={PROMPT_TO_LIGHT_CLASS_MAP}
          mediumColorMap={PROMPT_TO_MEDIUM_CLASS_MAP}
          darkColorMap={PROMPT_TO_DARK_CLASS_MAP}
          color={promptData?.color}
        />
      </div>
    </div>
  );
}
