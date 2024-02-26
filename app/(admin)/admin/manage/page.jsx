'use client';

import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

const fetcher = async (url) => axios.post(url).then((res) => res.data);

export default function ManagePage() {
  const router = useRouter();

  const { data: prompts } = useSWR(`/api/prompt/all`, fetcher, {
    revalidateIfStale: true,
  });

  const { trigger: createNewPrompt } = useSWRMutation(
    '/api/manage/createPrompt',
    (url) => {
      return axios.put(url);
    },
    {
      onSuccess: (data) => {
        const newPromptId = data?.data?.promptId;
        toast.success('New prompt card created.');
        router.push(`/admin/manage/${newPromptId}`);
      },
      onError: () => {
        toast.error('Failed to create new prompt card.');
      },
    }
  );

  const handlePromptButtonClick = (promptId) => {
    router.push(`/admin/manage/${promptId}`);
  };

  const handleAIProfileButtonClick = () => {
    router.push(`/admin/manage/aiProfile`);
  };

  const createNewPromptForm = () => {
    createNewPrompt();
  };

  return (
    <div className='flex flex-col w-full h-full items-center'>
      <p className='text-center text-secondary'>Additional Features:</p>
      <div className='flex flex-col gap-5 m-5 w-full max-w-lg'>
        <button
          className='bg-primary p-5 rounded-sm hover:shadow-custom'
          onClick={() => handleAIProfileButtonClick()}
        >
          Change AI Profile
        </button>
        <button
          className='bg-primary p-5 rounded-sm hover:shadow-custom'
          onClick={() => createNewPromptForm()}
        >
          Create New Prompt Card
        </button>
        <p className='text-center text-secondary'>Existing Prompt Cards:</p>
        {prompts?.map((prompt) => (
          <button
            key={prompt.promptId}
            className={twMerge(
              'p-5 rounded-sm hover:shadow-custom',
              `bg-${prompt.color}-dark`
            )}
            onClick={() => handlePromptButtonClick(prompt.promptId)}
          >
            {prompt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
