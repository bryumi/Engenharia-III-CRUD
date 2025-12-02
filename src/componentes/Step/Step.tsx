/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  state: 'equal' | 'bigger' | 'smaller';
  text: string;
  description: string;
}

const Step = ({ state, text, description }: Props) => {
  return (
    <div className="relative flex flex-col gap-[22px] items-center justify-center z-1 first:translate-x-[-50%] last:translate-x-[50%]">
      <div
        className={twMerge(
          'w-[44px] h-[44px] rounded-[12px] border-1  flex items-center justify-center transition-colors duration-500 ease-in-out',
          state !== 'smaller'
            ? 'bg-primary border-primary'
            : 'bg-primary40 border-primary40',
        )}
      >
        <span className={twMerge('text-[24px] font-bold text-white2')}>
          {text}
        </span>
      </div>
      <span
        className={twMerge(
          'text-[18px] font-bold',
          state !== 'smaller' ? 'text-primary' : 'text-primary40',
        )}
      >
        {description}
      </span>
    </div>
  );
};

export default Step;
