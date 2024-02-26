import { twMerge } from 'tailwind-merge';

export default function InputQuestion({
  mediumColorMap,
  color,
  question,
  questionNumber,
  answers,
  setAnswers,
}) {
  return (
    <div className='my-5'>
      <p
        className={twMerge(
          'text-left rounded-xl px-3 py-1',
          mediumColorMap[color]
        )}
      >
        {questionNumber + '. ' + question?.question}
      </p>
      <div
        className={twMerge(
          'flex relative rounded-xl my-3',
          mediumColorMap[color]
        )}
      >
        <textarea
          className={twMerge(
            'w-full text-white outline-none px-3 py-2 bg-gray-100 bg-opacity-30 rounded-xl placeholder:text-white'
          )}
          placeholder='Please specify inside this text box...'
          value={
            questionNumber >= 1 ? answers?.[questionNumber - 1]?.value : ''
          }
          onChange={(e) => {
            const newAnswers = answers.map((answer, index) => {
              if (index === questionNumber - 1) {
                return { ...answer, type: 'input', value: e.target.value };
              }
              return answer;
            });
            setAnswers([...newAnswers]);
            sessionStorage.setItem('answers', JSON.stringify(newAnswers));
          }}
          maxLength='120'
        />
        <p className='absolute py-2 right-0 bottom-0 px-3 text-xs opacity-70'>{`${
          questionNumber >= 1 && answers?.[questionNumber - 1]?.value?.length
        }/120`}</p>
      </div>
    </div>
  );
}
