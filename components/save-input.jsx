export default function SaveInput({ onChange, value }) {
  return (
    <>
      <div className='flex w-full'>
        <input
          type='text'
          className='bg-transparent p-2 outline-none w-full border border-primary text-gray-400'
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
}
