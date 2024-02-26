import Navbar from '@/components/navbar';

export default function LikedLayout({ children }) {
  return (
    <div>
      <div className='flex flex-col items-center justify-center p-5 sm:p-10 mb-20'>
        {children}
      </div>
      <Navbar />
    </div>
  );
}
