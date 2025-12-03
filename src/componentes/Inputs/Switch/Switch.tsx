/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  switchModel?: KeyOfStyles;
}

const switchModels = {
  0: 'bg-primary80 peer-checked:bg-secondary',
  1: 'bg-primary80 peer-checked:bg-success',
};

export type KeyOfStyles = keyof typeof switchModels;

const Switch: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { id, switchModel = 0, ...rest }: Props,
  ref,
) => {
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        className="peer hidden"
        {...rest}
        ref={ref}
      />
      <label
        htmlFor={id}
        className={twMerge(
          switchModels[switchModel],
          'before:bg-white2 relative block h-[1.5rem] w-[2.5rem] cursor-pointer rounded-[6.25rem] transition-all before:absolute before:top-[50%] before:left-[2px] before:block before:h-[1.25rem] before:w-[1.25rem] before:translate-y-[-50%] before:rounded-[50%] before:transition-all peer-checked:before:left-[1.1rem]!',
        )}
      />
    </div>
  );
};

export default forwardRef(Switch);
