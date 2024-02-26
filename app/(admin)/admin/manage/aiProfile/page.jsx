'use client';

import { useState } from 'react';
import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { ImSpinner10 } from 'react-icons/im';

const fetcher = async (url) => axios.post(url).then((res) => res.data);

export default function AIProfilePage() {
  const [profile, setProfile] = useState('');
  const { data: aiProfile, mutate } = useSWR('/api/manage/aiProfile', fetcher, {
    revalidateIfStale: true,
  });

  const { trigger: updateAIProfile, isMutating: isLoading } = useSWRMutation(
    '/api/manage/aiProfile',
    (url) => {
      return axios.patch(url, {
        profile,
      });
    },
    {
      onSuccess: () => {
        mutate();
        toast.success('AI profile updated.');
      },
      onError: () => {
        toast.error('Failed to update AI profile.');
      },
    }
  );

  const updateProfile = () => {
    if (profile.length === 0) {
      toast.error('Please enter some text.');
      return;
    }
    updateAIProfile();
  };

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='flex flex-col w-full max-w-3xl p-5 space-y-5'>
        <textarea
          name='aiProfile'
          id='aiProfile'
          cols='30'
          rows='10'
          placeholder='Enter new AI profile here...'
          className='bg-gray-100 bg-opacity-10 outline-none p-2 rounded-md'
          onChange={(e) => setProfile(e.target.value)}
        />
        <button
          className='flex items-center justify-center cursor-pointer hover:text-primary transition-colors'
          disabled={isLoading}
          onClick={updateProfile}
        >
          {isLoading ? (
            <ImSpinner10 className='animate-spin w-6 h-6' />
          ) : (
            <FaSave className='h-6 w-6' />
          )}
        </button>
      </div>
      <p className='w-2/3 text-center p-5 opacity-50'>
        {aiProfile?.[0]?.value}
      </p>
    </div>
  );
}
