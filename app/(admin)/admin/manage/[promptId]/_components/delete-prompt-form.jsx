import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ImSpinner10 } from 'react-icons/im';
import { MdDeleteForever } from 'react-icons/md';
import useSWRMutation from 'swr/mutation';

export default function DeletePromptForm({ promptId }) {
  const router = useRouter();

  const { trigger: deletePromptForm, isMutating: isDeleting } = useSWRMutation(
    `/api/manage/${promptId}`,
    (url) => {
      return axios.delete(url, {
        data: {
          promptId,
        },
      });
    },
    {
      onSuccess: () => {
        toast.success('Prompt form deleted');
        router.push('/admin/manage');
      },
      onError: () => {
        toast.error('Failed to delete prompt form');
      },
    }
  );

  const deletePrompt = () => {
    deletePromptForm();
  };

  return (
    <div className='flex w-full justify-center my-3'>
      <button
        disabled={isDeleting}
        className='flex items-center justify-center space-x-2 bg-red-500 p-2 rounded-md px-3 hover:shadow-sm hover:shadow-red-800 transition-all hover:-translate-y-0.5'
        onClick={deletePrompt}
      >
        {isDeleting ? (
          <ImSpinner10 className='animate-spin w-6 h-6' />
        ) : (
          <>
            <MdDeleteForever className='h-8 w-8' />
            <p>Delete</p>
          </>
        )}
      </button>
    </div>
  );
}
