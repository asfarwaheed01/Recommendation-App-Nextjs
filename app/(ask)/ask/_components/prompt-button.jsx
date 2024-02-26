'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const bgMap = {
  red: 'bg-red-button-background',
  blue: 'bg-blue-button-background',
  yellow: 'bg-yellow-button-background',
};

export default function PromptButton({ id, label, color }) {
  const router = useRouter();
  const handlePromptClick = () => {
    router.push(`/ask/${id}`);
  };

  return (
    <button
      className={twMerge(
        'my-5 mx-2 p-5 w-full max-w-3xl bg-no-repeat bg-fit bg-center rounded-full',
        bgMap[color]
      )}
      onClick={handlePromptClick}
    >
      {label}
    </button>
  );
}
