/* eslint-disable @next/next/no-img-element */
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import { fustat } from '@/styles/fonts';
import { twMerge } from 'tailwind-merge';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  customClassNames?: string;
  buttons?: ReactNode;
  directionClassName?: 'flex-col' | 'flex-row';
}

const Textarea: ForwardRefRenderFunction<HTMLTextAreaElement, Props> = (
  {
    id,
    readOnly,
    disabled,
    label,
    description,
    name,
    error,
    customClassNames,
    buttons,
    directionClassName = 'flex-col',
    ...rest
  }: Props,
  ref,
) => {
  return (
    <div className={twMerge('flex w-full gap-2', directionClassName)}>
      <div className={twMerge('flex w-full gap-[4px]', directionClassName)}>
        {label && (
          <div className="flex items-center justify-between">
            <label
              className={`${fustat.className} text-neutral flex h-[14px] items-center gap-2 text-[14px] leading-[24px] font-normal`}
              htmlFor={id || name}
            >
              {label}
              {description && (
                <span className="text-neutral2 text-[16px] font-light">{` ${description}`}</span>
              )}
            </label>
            {buttons && !disabled && (
              <div className="flex items-center gap-[16px]">{buttons}</div>
            )}
          </div>
        )}
        <div
          className={twMerge(
            'border-primary20 bg-white2 relative flex w-full items-center justify-center rounded-[0.75rem] border-1',
          )}
        >
          <textarea
            id={id || name}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete="off"
            className={twMerge(
              fustat.className,
              'text-neutral80 placeholder:text-primary20 h-full w-full resize-none rounded-[0.75rem] p-[18px_16px]! text-[14px] font-normal outline-0',
              customClassNames,
            )}
            name={name}
            {...rest}
            ref={ref}
          />
        </div>
      </div>
      {error && (
        <span className="text-warning text-[10px] font-normal">{error}</span>
      )}
    </div>
  );
};

export default forwardRef(Textarea);
