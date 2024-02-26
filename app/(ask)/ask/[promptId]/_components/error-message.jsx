import { twMerge } from 'tailwind-merge';

export default function ErrorMessage({ lightColorMap, color }) {
  return (
    <div
      className={twMerge(
        'flex items-center justify-center h-[500px] sm:h-[700px] px-20 text-xl text-center mb-80',
        lightColorMap[color]
      )}
    >
      Something went wrong!
    </div>
  );
}
