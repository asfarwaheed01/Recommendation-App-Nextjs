export default function OptionInput({ optionText, onChange, value }) {
  return (
    <>
      <div>
        <div className='flex w-full justify-evenly items-center py-2'>
          <p className='w-[200px]'>{optionText}</p>
          <input
            type='text'
            className='bg-transparent p-2 outline-none w-full border border-primary text-gray-400'
            onChange={onChange}
            value={value}
          />
        </div>
      </div>
    </>
  );
}
