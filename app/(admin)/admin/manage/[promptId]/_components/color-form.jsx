'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';
import { FaSave } from 'react-icons/fa';
import { ImSpinner10 } from 'react-icons/im';

export default function ColorForm({ color, promptId, refresh }) {
  const [selectedColor, setSelectedColor] = useState('');

  const { trigger: save, isMutating: isLoading } = useSWRMutation(
    `/api/manage/${promptId}/color`,
    (url) => {
      return axios.patch(url, {
        promptId,
        color: selectedColor,
      });
    },
    {
      onSuccess: () => {
        refresh();
        toast.success('Color updated.');
      },
      onError: () => {
        toast.error('Failed to update color.');
      },
    }
  );

  const saveColor = () => {
    save();
  };

  return (
    <div className='flex flex-col w-full items-left space-y-5 border p-5 mb-5'>
      <h1 className='text-primary font-bold'>Color:</h1>
      <p className='opacity-70 text-sm italic'>{color}</p>
      <div className='flex w-full space-x-2'>
        <fieldset className='flex flex-wrap justify-between gap-3 flex-1 mx-5 sm:mx-10'>
          <div>
            <input
              type='radio'
              value='red'
              id='red'
              checked={selectedColor === 'red'}
              onChange={() => setSelectedColor('red')}
              className='cursor-pointer outline-none accent-primary'
            />
            <label htmlFor='red' className='ml-2 cursor-pointer'>
              Red
            </label>
          </div>
          <div>
            <input
              type='radio'
              value='blue'
              id='blue'
              checked={selectedColor === 'blue'}
              onChange={() => setSelectedColor('blue')}
              className='cursor-pointer outline-none accent-primary'
            />
            <label htmlFor='blue' className='ml-2 cursor-pointer'>
              Blue
            </label>
          </div>
          <div>
            <input
              type='radio'
              value='yellow'
              id='yellow'
              checked={selectedColor === 'yellow'}
              onChange={() => setSelectedColor('yellow')}
              className='cursor-pointer outline-none accent-primary'
            />
            <label htmlFor='yellow' className='ml-2 cursor-pointer'>
              Yellow
            </label>
          </div>
        </fieldset>
      </div>
      <button
        className='flex items-center justify-center cursor-pointer hover:text-primary transition-colors'
        disabled={isLoading}
        onClick={saveColor}
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
