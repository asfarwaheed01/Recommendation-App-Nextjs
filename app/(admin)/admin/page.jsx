import { validateAdmin } from '@/lib/validateAdmin';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { userId } = auth();

  if (!validateAdmin(userId)) {
    return redirect('/ask');
  }

  return redirect('/admin/analytics');
}
