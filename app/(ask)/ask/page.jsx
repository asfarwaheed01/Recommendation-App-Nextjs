'use client';

import axios from 'axios';
import useSWR from 'swr';

import PromptButton from './_components/prompt-button';
import SearchBar from '@/components/search-bar';
import { ImSpinner10 } from 'react-icons/im';

const fetcher = async (url) => axios.post(url).then((res) => res.data);

export default function AskPage() {
  const { data: prompts, isLoading } = useSWR('/api/prompt/all', fetcher, {
    revalidateIfStale: true,
  });

  {
    return isLoading ? (
      <div className='flex items-center justify-center h-screen'>
        <ImSpinner10 className='animate-spin w-24 h-24' />
      </div>
    ) : (
      <>
        <SearchBar />
        <div className='flex flex-col w-full h-full items-center gap-7 sm:gap-8 p-10 mb-20'>
          {prompts?.map((prompt) => (
            <PromptButton
              key={prompt.promptId}
              id={prompt.promptId}
              label={prompt.label}
              color={prompt.color}
            />
          ))}
        </div>
      </>
    );
  }
}
