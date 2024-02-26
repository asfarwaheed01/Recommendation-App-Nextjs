import { SlLock } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';

export default function AnswerLevel({
  mediumColorMap,
  darkColorMap,
  darkestColorMap,
  color,
  question,
  selectedChoice,
  setSelectedChoice,
}) {
  return (
    <div className='my-5'>
      <p className={twMerge('text-center rounded-xl', mediumColorMap[color])}>
        {question?.question}
      </p>
      <div className='flex gap-2 justify-between my-2'>
        {question?.choices?.map((choice, index) => (
          <button
            key={index}
            disabled={index === 2}
            className={twMerge(
              'text-center w-full py-4 rounded-xl',
              selectedChoice === choice
                ? darkColorMap[color] + ' shadow-custom'
                : mediumColorMap[color],
              index === 2 &&
                `${darkestColorMap[color]} gap-2 flex justify-center items-center text-gray-300`
            )}
            onClick={() => {
              setSelectedChoice(choice);
              sessionStorage.setItem('answerLevel', choice);
            }}
          >
            {index === 2 ? <SlLock className='h-6 w-6' /> : <p>{choice}</p>}
            {index == 0 && (
              <p className='w-full text-center text-xs'>(4 Questions)</p>
            )}
            {index == 1 && (
              <p className='w-full text-center text-xs'>(8 Questions)</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
