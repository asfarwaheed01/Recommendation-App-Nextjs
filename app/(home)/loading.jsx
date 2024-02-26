import { ImSpinner10 } from 'react-icons/im';

export default function Loading() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <ImSpinner10 className='animate-spin w-8 h-8' />
    </div>
  );
}
