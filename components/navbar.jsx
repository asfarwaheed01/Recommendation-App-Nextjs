import Link from 'next/link';
import { IoIosHome, IoIosHeart, IoIosPerson } from 'react-icons/io';

export default function Navbar() {
  return (
    <div className='flex fixed bottom-0 w-full items-center justify-around bg-[#02051c] h-20'>
      <Link className='flex flex-col items-center' href='/ask'>
        <IoIosHome className='h-6 w-6 my-2' />
        <p>Home</p>
      </Link>
      <Link className='flex flex-col items-center' href='/liked'>
        <IoIosHeart className='h-6 w-6 my-2' />
        <p>Liked</p>
      </Link>
      <Link className='flex flex-col items-center' href='/user-profile'>
        <IoIosPerson className='h-6 w-6 my-2' />
        <p>Account</p>
      </Link>
    </div>
  );
}
