'use client';

import axios from 'axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { twMerge } from 'tailwind-merge';
import { ImSpinner10 } from 'react-icons/im';
import { SlShare } from 'react-icons/sl';
import { MdOutlineDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

const PROMPT_TO_LIGHT_CLASS_MAP = {
  red: 'bg-red-light',
  blue: 'bg-blue-light',
  yellow: 'bg-yellow-light',
};

const PROMPT_TO_MEDIUM_CLASS_MAP = {
  red: 'bg-red-medium',
  blue: 'bg-blue-medium',
  yellow: 'bg-yellow-medium',
};

const PROMPT_TO_DARK_CLASS_MAP = {
  red: 'bg-red-dark',
  blue: 'bg-blue-dark',
  yellow: 'bg-yellow-dark',
};

const PROMPT_TO_DARKEST_CLASS_MAP = {
  red: 'bg-red-darkest',
  blue: 'bg-blue-darkest',
  yellow: 'bg-yellow-darkest',
};

const fetcher = async (url) => axios.post(url).then((res) => res.data);

export default function LikedPage() {
  const {
    data: liked,
    isLoading,
    mutate,
  } = useSWR('/api/user/like', fetcher, { revalidateIfStale: true });

  const { trigger: deleteLiked, isMutating: isDeleting } = useSWRMutation(
    '/api/user/like',
    (url, { arg }) => {
      return axios.delete(url, {
        data: {
          arg,
        },
      });
    },
    {
      onSuccess: () => {
        toast.success('Liked response deleted');
        mutate();
      },
      onError: () => {
        toast.error('Failed to delete liked response');
      },
    }
  );

  const deleteLikedResponses = (responseId) => {
    deleteLiked({ responseId });
  };

  const shareLikedResponses = (responseId) => {
    const currentResponse =
      liked.filter((response) => responseId === response._id)[0] ?? {};

    const resultString =
      'Hey, check out these recommendations that Know Yourself gave me!' +
      '\n\n' +
      currentResponse?.results?.reduce((res, result) => {
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
    <div
      className={twMerge(
        'flex flex-col text-white text-lg w-full h-full p-2 max-w-3xl'
      )}
    >
      {isLoading ? (
        <div className='flex justify-center items-center my-auto w-full h-full'>
          <ImSpinner10 className='animate-spin w-24 h-24' />
        </div>
      ) : (
        liked?.map((responses, index) => (
          <div
            key={index}
            className={twMerge(
              'flex flex-col my-5 text-white text-lg w-full h-full p-2 overflow-auto max-w-3xl rounded-xl',
              PROMPT_TO_LIGHT_CLASS_MAP[responses.color]
            )}
          >
            {responses.results.map((result, index) => (
              <div
                key={index}
                className={twMerge(
                  'p-5 my-2 rounded-xl',
                  PROMPT_TO_MEDIUM_CLASS_MAP[responses.color]
                )}
              >
                <p className='text-center'>{result}</p>
              </div>
            ))}
            <div className='flex justify-evenly items-center h-full space-x-2'>
              <button
                className={twMerge(
                  'text-center py-5 flex items-center justify-center gap-3 w-auto sm:w-[150px] px-2 sm:px-5 rounded-xl',
                  PROMPT_TO_DARK_CLASS_MAP[responses.color]
                )}
                onClick={() => deleteLikedResponses(responses._id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <ImSpinner10 className='animate-spin w-8 h-8' />
                ) : (
                  <>
                    <MdOutlineDelete />
                    <p>Delete</p>
                  </>
                )}
              </button>
              <button
                className={twMerge(
                  'text-center py-5 flex items-center justify-center gap-3 w-auto sm:w-[150px] px-2 sm:px-5 rounded-xl',
                  PROMPT_TO_DARK_CLASS_MAP[responses.color]
                )}
                onClick={() => shareLikedResponses(responses._id)}
              >
                <SlShare />
                <p>Share</p>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
