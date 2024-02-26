'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsGraphUp } from 'react-icons/bs';
import { MdOutlineSettings } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className='flex w-full justify-between my-5'>
      <Link
        href='/admin/analytics'
        className={twMerge(
          'flex gap-3 items-center justify-center p-5 w-full border-t border-b',
          pathname?.includes('analytics') && 'bg-primary'
        )}
      >
        <BsGraphUp className='h-4 w-4' /> <p>Analytics</p>
      </Link>
      <Link
        href='/admin/manage'
        className={twMerge(
          'flex gap-3 items-center justify-center p-5 w-full border-t border-b',
          pathname?.includes('manage') && 'bg-primary'
        )}
      >
        <MdOutlineSettings className='h-4 w-4' />
        <p>Manage</p>
      </Link>
    </div>
  );
}
