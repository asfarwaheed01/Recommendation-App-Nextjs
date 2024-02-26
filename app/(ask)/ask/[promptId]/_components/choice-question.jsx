import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function ChoiceQuestion({
  mediumColorMap,
  darkColorMap,
  color,
  question,
  questionNumber,
  answers,
  setAnswers,
}) {
  const [isCustomInput, setIsCustomInput] = useState(false);

  return (
    <div className='my-5'>
      <p
        className={twMerge(
          'text-left rounded-xl px-3 py-1',
          mediumColorMap[color]
        )}
      >
        {questionNumber + '. ' + question?.question}
      </p>
      <div className='grid grid-cols-2 gap-2 justify-between my-3'>
        {question?.choices?.map((choice, index) => (
          <button
            key={index}
            className={twMerge(
              'text-left w-full p-2 rounded-xl',
              questionNumber >= 1 &&
                answers?.[questionNumber - 1]?.value === choice
                ? darkColorMap[color] + ' shadow-custom'
                : mediumColorMap[color]
            )}
            onClick={() => {
              const newAnswers = answers.map((answer, index) => {
                if (index === questionNumber - 1) {
                  return { type: 'choice', value: choice };
                }
                return answer;
              });
              setAnswers([...newAnswers]);
              sessionStorage.setItem('answers', JSON.stringify(newAnswers));
              setIsCustomInput(false);
            }}
          >
            {choice}
          </button>
        ))}
        <div
          className={twMerge(
            'flex w-full rounded-xl relative',
            mediumColorMap[color],
            isCustomInput && darkColorMap[color] + ' shadow-custom'
          )}
        >
          <input
            className={twMerge(
              'flex w-full px-3 py-1 outline-none bg-gray-100 bg-opacity-30 rounded-xl placeholder:text-white',
              isCustomInput &&
                answers[questionNumber - 1]?.value?.length > 0 &&
                darkColorMap[color]
            )}
            type='text'
            placeholder='Other...'
            onChange={(e) => {
              const newAnswers = answers.map((answer, index) => {
                if (index === questionNumber - 1) {
                  return { type: 'choice', value: e.target.value };
                }
                return answer;
              });
              setAnswers([...newAnswers]);
              setIsCustomInput(true);
            }}
            maxLength={12}
          />
          <p className='absolute right-0 bottom-0 px-3 py-2 text-xs scale-80 opacity-70'>
            {isCustomInput
              ? `${answers[questionNumber - 1]?.value?.length}/12`
              : '0/12'}
          </p>
        </div>
      </div>
    </div>
  );
}
