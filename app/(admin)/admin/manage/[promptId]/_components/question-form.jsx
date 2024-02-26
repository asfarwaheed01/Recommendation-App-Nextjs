"use client";

import { useState } from "react";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

export default function QuestionForm({ promptId, questionData, refresh }) {
  const [editQuestions, setEditQuestions] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(questionData?.choices);

  const questionType = questionData?.category;
  const { trigger: deleteQuestion, isMutating: isLoading } = useSWRMutation(
    `/api/manage/${promptId}/question`,
    (url, { arg }) => {
      return axios.delete(url, {
        data: {
          arg,
        },
      });
    },
    {
      onSuccess: () => {
        refresh();
        !showToast ? toast.success("Question deleted.") : null;
        setShowToast(false);
      },
      onError: () => {
        toast.error("Failed to delete question.");
      },
    }
  );

  const { trigger: save, isMutating: isEditLoading } = useSWRMutation(
    `/api/manage/${promptId}/question`,
    (url) => {
      return axios.put(url, {
        promptId,
        questionId: questionData._id,
        questionType,
        question,
        choices,
      });
    },
    {
      onSuccess: () => {
        setEditQuestions(false);
        setQuestion("");
        toast.success("Question Edited.");
        refresh();
      },
      onError: () => {
        toast.error("Failed to add question.");
      },
    }
  );

  const saveQuestion = () => {
    setShowToast(true);
    save();
  };

  const editQuestion = () => {
    setEditQuestions(true);
    setQuestion(questionData?.question);
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  return (
    <div className="flex relative flex-col w-full items-left space-y-2 border p-5 mb-5">
      <h1 className="text-primary font-bold">
        Question {questionData.questionId}:
      </h1>
      <h2 className="text-sm">Question Type:</h2>
      <p className="opacity-70 text-sm">{questionData.category}</p>
      <h2 className="text-sm">Question:</h2>
      {!editQuestions && (
        <p className="opacity-70 text-sm italic">{questionData?.question}</p>
      )}
      {editQuestions && (
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex flex-1 bg-gray-100 bg-opacity-10 outline-none p-2"
        />
      )}
      {!editQuestions && questionData?.choices?.length > 0 && (
        <>
          <h2 className="text-sm">Options:</h2>
          <ul>
            {questionData?.choices?.map((choice, index) => (
              <li key={index} className="opacity-70 text-sm italic">
                {choice}
              </li>
            ))}
          </ul>
        </>
      )}
      {editQuestions && (
        <>
          <h2 className="text-sm">Options:</h2>
          <ul>
            {choices.map((choice, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  className="flex flex-1 bg-gray-100 bg-opacity-10 outline-none p-2"
                />
              </li>
            ))}
          </ul>
        </>
      )}
      {!editQuestions && (
        <>
          <button
            className="absolute right-6 top-5 hover:text-red-500 transition-colors"
            disabled={isLoading}
            onClick={() =>
              deleteQuestion({
                promptId: promptId,
                questionId: questionData._id,
              })
            }
          >
            <MdDelete className="w-6 h-6" />
          </button>
          <button
            className="absolute right-16 top-5 hover:text-red-500 transition-colors"
            disabled={isLoading}
            onClick={() => editQuestion()}
          >
            <MdEdit className="w-6 h-6" />
          </button>
        </>
      )}
      {editQuestions && (
        <button
          className="absolute right-10 top-5 hover:text-red-500 transition-colors"
          disabled={isEditLoading}
          onClick={() => saveQuestion()}
        >
          Save
        </button>
      )}
    </div>
  );
}
