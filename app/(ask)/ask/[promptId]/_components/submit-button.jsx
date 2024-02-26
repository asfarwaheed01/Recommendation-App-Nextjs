import { twMerge } from 'tailwind-merge';
import { ImSpinner10 } from 'react-icons/im';
import { IoIosSend } from 'react-icons/io';

export default function SubmitButton({
  askAI,
  isLoading,
  darkColorMap,
  color,
}) {
  return (
    <button
      className={twMerge(
        'p-3 mt-3 mb-9 mx-auto rounded-xl',
        !isLoading && darkColorMap[color]
      )}
      onClick={askAI}
      disabled={isLoading}
    >
      {isLoading ? (
        <ImSpinner10 className='animate-spin w-24 h-24' />
      ) : (
        <div className='flex items-center gap-2'>
          <p>Submit</p>
          <IoIosSend />
        </div>
      )}
    </button>
  );
}
