import { fustat } from '@/styles/fonts';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

const Radio: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, name, id, checked, ...rest }: Props,
  ref,
) => {
  const radioId =
    id || `radio-${name}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className="flex cursor-pointer flex-row items-center gap-[8px]">
      <input
        id={radioId}
        type="radio"
        name={name}
        checked={checked}
        className="peer hidden"
        {...rest}
        ref={ref}
      />
      <div
        className={twMerge(
          'h-[24px] w-[24px] rounded-full border-1 border-[#D1D0D0] transition-all',
          'peer-checked:border-secondary peer-checked:border-4',
          checked && 'border-secondary border-4',
        )}
      />
      <span
        className={twMerge(
          fustat.className,
          'text-secondary60-2 text-[14px] font-normal',
        )}
      >
        {label}
      </span>
    </label>
  );
};

export default forwardRef(Radio);
