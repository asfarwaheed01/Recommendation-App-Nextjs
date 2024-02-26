import Navbar from '@/components/navbar';

export default function AskLayout({ children }) {
  return (
    <div>
      <div className='flex flex-col items-center justify-center mb-20'>
        {children}
      </div>
      <Navbar />
    </div>
  );
}
