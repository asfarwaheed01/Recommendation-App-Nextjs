import Image from 'next/image';

import Navbar from './_components/navbar';
import logo from '@/public/assets/logo.jpeg';

export default function AdminLayout({ children }) {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex'>
        <div className='flex justify-center items-center'>
          <Image
            src={logo}
            alt='Logo'
            width={50}
            height={50}
            className='mx-2'
          />
        </div>
        <p className='flex h-16 p-5 w-full justify-center font-semibold flex-1 text-secondary'>
          ADMIN DASHBOARD
        </p>
      </div>
      <Navbar />
      {children}
    </div>
  );
}
