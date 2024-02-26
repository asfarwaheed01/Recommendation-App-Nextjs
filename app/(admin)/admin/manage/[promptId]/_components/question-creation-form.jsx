'use client';

import { useState } from 'react';
import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';
import Select from 'react-tailwindcss-select';
import { ImSpinner10 } from 'react-icons/im';
import { MdAddCircleOutline, MdAddCircle, MdDelete } from 'react-icons/md';

export default function QuestionCreationForm({ promptId, refresh }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([]);

  const [questionType, setQuestionType] = useState('');
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState([]);
  const [choiceValue, setChoiceValue] = useState('');

  const selectOptions = [
    {
      value: 'Choice',
      label: 'Choice-based',
    },
    { value: 'Input', label: 'Input-based' },
  ];

  const handleSelectInput = (value) => {
    setSelectedOption(value);
    setQuestionType(value.value);
  };

  const saveChoice = () => {
    setChoices((prev) => [...prev, choiceValue]);
    setChoiceValue('');
  };

  const deleteChoice = (choiceToDelete) => {
    const newChoices = choices.filter((choice) => choice != choiceToDelete);
    setChoices([...newChoices]);
  };

  const { trigger: save, isMutating: isLoading } = useSWRMutation(
    `/api/manage/${promptId}/question`,
    (url) => {
      return axios.patch(url, {
        promptId,
        questionType,
        question,
        choices,
      });
    },
    {
      onSuccess: () => {
        refresh();
        setQuestion('');
        setChoiceValue('');
        setChoices([]);
        toast.success('Question added.');
      },
      onError: () => {
        toast.error('Failed to add question.');
      },
    }
  );

  const saveQuestion = () => {
    save();
  };

  return (
    <div className='flex relative flex-col w-full items-left space-y-5 border p-5 mb-5'>
      <h1 className='text-primary font-bold'>Add New Question:</h1>
      <h2 className='text-sm'>Select Question type:</h2>
      <Select
        value={selectedOption}
        onChange={handleSelectInput}
        options={selectOptions}
        placeholder='Select...'
        classNames={{
          menuButton: () => 'flex px-2 cursor-pointer text-white',
          menu: 'text-white',
          listItem: () =>
            'flex p-2 hover:bg-primary transition-colors cursor-pointer',
        }}
      />
      <div className='flex w-full'>
        {options.map((option, index) => {
          return <div key={index}>{option}</div>;
        })}
      </div>
      <h2 className='text-sm'>Enter Question:</h2>
      <input
        type='text'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className='flex flex-1 bg-gray-100 bg-opacity-10 outline-none p-2'
      />
      {questionType === 'Choice' && (
        <>
          <h2 className='text-sm'>Enter Choice:</h2>
          <div className='flex space-x-2'>
            <input
              type='text'
              className='flex flex-1 bg-gray-100 bg-opacity-10 outline-none p-2'
              value={choiceValue}
              onChange={(e) => setChoiceValue(e.target.value)}
            />
            <button
              className='flex items-center justify-center cursor-pointer hover:text-primary transition-colors'
              onClick={saveChoice}
            >
              <MdAddCircleOutline className='h-6 w-6' />
            </button>
          </div>
          <div className='flex flex-col items-center'>
            {choices.map((choice, index) => (
              <div key={index} className='flex justify-between w-48 sm:w-1/3'>
                <p>{choice}</p>
                <button
                  className='hover:text-red-500 transition-colors'
                  onClick={() => deleteChoice(choice)}
                >
                  <MdDelete className='w-4 h-4' />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <button
        className='flex items-center justify-center cursor-pointer hover:text-primary transition-colors'
        disabled={isLoading}
        onClick={saveQuestion}
      >
        {isLoading ? (
          <ImSpinner10 className='animate-spin w-6 h-6' />
        ) : (
          <MdAddCircle className='h-6 w-6' />
        )}
      </button>
    </div>
  );
}
