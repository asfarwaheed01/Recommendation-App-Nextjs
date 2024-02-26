'use client';

import Link from 'next/link';
import { UserProfile, useClerk } from '@clerk/nextjs';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const UserProfilePage = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-5 w-full justify-center'>
        <Link
          className='flex justify-center items-center bg-primary rounded-sm p-3'
          href='/ask'
        >
          <FaHome className='h-6 w-6 mx-2' />
          <p>Back to Homepage</p>
        </Link>
        <div className='flex justify-center items-center bg-primary rounded-sm p-3'>
          <FaSignOutAlt className='h-6 w-6 mr-2' />
          <button onClick={() => signOut(() => router.push('/'))}>
            Sign out
          </button>
        </div>
      </div>
      <UserProfile path='/user-profile' routing='path' />
    </div>
  );
};

export default UserProfilePage;
