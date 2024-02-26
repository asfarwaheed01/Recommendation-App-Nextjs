'use client';

import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { SlShare } from 'react-icons/sl';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { ImSpinner10 } from 'react-icons/im';

export default function UtilityButtons({
  color,
  darkColorMap,
  askAI,
  isLoading,
  aiResponses,
  setIsSiginModalOpen,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const { isSignedIn } = useAuth();

  const { trigger: likeResult } = useSWRMutation('/api/user/like', (url) => {
    return axios.put(url, {
      aiResponses,
      color,
    });
  });

  const reloadAnswer = () => {
    askAI();
    setIsLiked(false);
  };

  const like = () => {
    if (!isSignedIn) {
      setIsSiginModalOpen(true);
      return;
    }
    setIsLiked(true);
    likeResult();
  };

  const share = () => {
    const resultString =
      'Hey, check out these recommendations that Know Yourself gave me!' +
      '\n\n' +
      aiResponses.reduce((res, result) => {
        return res + '\n\n' + result;
      });

    navigator
      .share({
        title: 'Know Yourself',
        url: process.env.NEXT_PUBLIC_APP_URL,
        text: resultString,
      })
      .then(() => {
        toast.success('Thanks for sharing!');
      })
      .catch(console.error);
  };

  return (
    <div className='flex mt-8 mb-4 justify-between items-center gap-2'>
      <button
        className={twMerge(
          'text-center w-full py-6 flex items-center justify-center gap-3 rounded-xl',
          darkColorMap[color]
        )}
        onClick={reloadAnswer}
        disabled={isLoading}
      >
        {isLoading ? (
          <ImSpinner10 className='animate-spin w-8 h-8' />
        ) : (
          <>
            <FaArrowRotateRight className='-rotate-90' />
            <p>More</p>
          </>
        )}
      </button>
      <button
        className={twMerge(
          'text-center w-full py-6 flex items-center justify-center gap-3 rounded-xl',
          darkColorMap[color]
        )}
        onClick={like}
      >
        {isLiked ? <BiSolidLike /> : <BiLike />}
        {isLiked ? <p>Liked</p> : <p>Like</p>}
      </button>
      <button
        className={twMerge(
          'text-center w-full py-6 flex items-center justify-center gap-3 rounded-xl',
          darkColorMap[color]
        )}
        onClick={share}
      >
        <SlShare />
        <p>Share</p>
      </button>
    </div>
  );
}
