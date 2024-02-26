import { ImSpinner10 } from 'react-icons/im';

export default function Spinner() {
  return (
    <div className='flex items-center justify-center h-[500px] w-full max-w-3xl sm:h-[700px]'>
      <ImSpinner10 className='animate-spin w-24 h-24' />
    </div>
  );
}
