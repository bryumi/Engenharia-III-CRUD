import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

import { twMerge } from 'tailwind-merge';

import MaskedInput from '../MaskedInput/MaskedInput';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  description?: string;

  maxWidthClassName?: string;

  maskFunction?: (value: string) => string;

  buttons?: ReactNode;

  lock?: boolean;
}

const InputSearch: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { id, disabled, name, maskFunction, type, maxWidthClassName, ...rest }: Props,

  ref,
) => {
  return (
    <div className={twMerge('flex w-full gap-2', maxWidthClassName)}>
      <div className="flex w-full gap-2">
        <div className="border-primary20 bg-white2 relative flex w-full items-center justify-center gap-[8px] rounded-[0.5rem] border-1 p-[10px]!">
          <MaskedInput
            id={id || name}
            disabled={disabled}
            className={twMerge(
              'text-neutral placeholder:text-neutral40 w-full text-[16px] font-normal',
              type === 'password' ? 'pr-[40px]!' : '',
            )}
            name={name}
            maskFunction={maskFunction}
            type={type}
            {...rest}
            ref={ref}
          />
          <img src="/img/icons/search.svg" alt="Pesquisar" />
        </div>
      </div>
    </div>
  );
};

export default forwardRef(InputSearch);
