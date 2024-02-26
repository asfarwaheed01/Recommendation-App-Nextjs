'use client';

import { useState } from 'react';
import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';

import { BiMessageDetail } from 'react-icons/bi';
import { ImSpinner10 } from 'react-icons/im';

export default function Feedback({ lightColorMap, mediumColorMap, color }) {
  const [feedback, setFeedback] = useState('');

  const { trigger: triggerSubmit, isMutating: isLoading } = useSWRMutation(
    `/api/feedback`,
    (url) => {
      return axios.post(url, {
        feedback,
      });
    },
    {
      onSuccess: () => {
        setFeedback('');
        toast.success('Feedback sent');
      },
      onError: () => {
        toast.error('Failed to send feedback');
      },
    }
  );

  const sendFeedback = () => {
    if (feedback.length === 0) {
      toast.error('Please enter your feedback.');
      return;
    }
    triggerSubmit();
  };

  return (
    <div
      className={twMerge(
        'flex flex-col items-center text-white w-full h-full p-2 overflow-auto max-w-3xl',
        lightColorMap[color]
      )}
    >
      <div className='w-full relative'>
        <textarea
          name='feedback'
          id='feedback'
          cols='30'
          rows='5'
          placeholder='We will consider all constructive feedback. Thanks'
          className={twMerge(
            'w-full p-2 text-white outline-none bg-gray-100 bg-opacity-20 rounded-xl placeholder:text-white placeholder:text-center'
          )}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <p className='absolute right-3 bottom-3 text-xs opacity-70'>{`${feedback?.length}/200`}</p>
      </div>
      {isLoading ? (
        <ImSpinner10 className='animate-spin w-6 h-6 my-5' />
      ) : (
        <button
          className={twMerge(
            'flex gap-2 justify-center items-center py-1 px-2 w-full rounded-xl my-5',
            mediumColorMap[color],
            'peer-checked:h-[200px] peer-checked:overflow-scroll transition-[height] duration-1000 ease-in-out'
          )}
          onClick={sendFeedback}
          disabled={isLoading}
        >
          <p>Send Feedback</p>
          <BiMessageDetail className='h-8 w-8' />
        </button>
      )}
    </div>
  );
}
