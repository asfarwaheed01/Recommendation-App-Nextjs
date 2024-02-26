'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { CiSearch } from 'react-icons/ci';
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineSend } from 'react-icons/ai';

import logo from '@/public/assets/logo.jpeg';
import { twMerge } from 'tailwind-merge';

const interFont = Inter({ subsets: ['latin'] });

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // TODO: Add Search Functionality
  };

  const clearSearchBar = () => {
    setSearchQuery('');
  };

  return (
    <div className='flex relative w-full items-center justify-center bg-[#070f36] h-20 p-5'>
      <Image src={logo} alt='Logo' width={40} height={40} className='mx-2' />
      <div className='flex w-full h-full items-center relative'>
        <CiSearch className='absolute z-10 text-[#070f36] w-8 h-8 left-1' />
        <input
          className='w-full h-full outline-none text-black px-3 pl-10'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <RxCross1
          className='absolute z-10 text-[#070f36] w-8 h-8 right-1 hover:scale-110 cursor-pointer transition-all'
          role='button'
          onClick={clearSearchBar}
        />
      </div>
      <AiOutlineSend
        className='mx-2 h-8 w-8 hover:scale-110 cursor-pointer transition-all'
        onClick={handleSearch}
        role='button'
      />
      <div className='flex absolute bg-[#565656] bg-opacity-90 w-full h-full flex-col items-center justify-center z-10 text-[#BFBFBF]'>
        <p
          className={twMerge(
            'text-[32px] text-center font-extrabold',
            interFont.className
          )}
        >
          This is the beta
        </p>
        <p
          className={twMerge(
            'text-[16px] text-center font-extrabold',
            interFont.className
          )}
        >
          Feature coming soon
        </p>
      </div>
    </div>
  );
}
