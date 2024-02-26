'use client';

import { useState } from 'react';
import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { ImSpinner10 } from 'react-icons/im';

export default function TitleForm({ label, promptId, refresh }) {
  const [titleQuestion, setTitleQuestion] = useState('');
  const { trigger: save, isMutating: isLoading } = useSWRMutation(
    `/api/manage/${promptId}/title`,
    (url) => {
      return axios.patch(url, {
        promptId,
        label: titleQuestion,
      });
    },
    {
      onSuccess: () => {
        refresh();
        setTitleQuestion('');
        toast.success('Title question updated.');
      },
      onError: () => {
        toast.error('Failed to update title question');
      },
    }
  );

  const saveTitle = () => {
    save();
  };

  return (
    <div className='flex flex-col w-full items-left space-y-5 border p-5 mb-5'>
      <h1 className='text-primary font-bold'>Title Question:</h1>
      <p className='opacity-70 text-sm italic'>{label}</p>
      <input
        type='text'
        className='flex flex-1 bg-gray-100 bg-opacity-10 outline-none p-2'
        value={titleQuestion}
        onChange={(e) => setTitleQuestion(e.target.value)}
      />
      <button
        className='flex items-center justify-center cursor-pointer hover:text-primary transition-colors'
        disabled={isLoading}
        onClick={saveTitle}
      >
        {isLoading ? (
          <ImSpinner10 className='animate-spin w-6 h-6' />
        ) : (
          <FaSave className='h-6 w-6' />
        )}
      </button>
    </div>
  );
}
