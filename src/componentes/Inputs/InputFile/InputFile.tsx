/* eslint-disable @next/next/no-img-element */
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { fustat, inter } from '@/styles/fonts';
import { twMerge } from 'tailwind-merge';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  files?: (File | string)[];
  error?: string;
  limit?: number;
  customClassNames?: string;
  buttons?: ReactNode;
  directionClassName?: 'flex-col' | 'flex-row';
  closeImg?: 'white' | 'blue';
  timeInSeconds?: number;
  handleRemove: (index: number) => void;
  noFilesMessage?: string;
}

const InputFile: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    id,
    readOnly,
    disabled,
    label,
    files = [],
    limit,
    description,
    name,
    error,
    customClassNames,
    buttons,
    directionClassName = 'flex-col',
    closeImg = 'blue',
    timeInSeconds,
    handleRemove,
    noFilesMessage,
    ...rest
  }: Props,
  ref,
) => {
  const canAddMoreFiles =
    !readOnly && !disabled && (limit === undefined || files.length < limit);
  return (
    <div className={twMerge('flex gap-2', directionClassName)}>
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
        <div className={twMerge('flex gap-[24px]')}>
          {files !== undefined &&
            files !== null &&
            Array.from(files).map((file, index) => (
              <div
                key={index}
                className={twMerge(
                  'relative h-[200px] w-[200px]',
                  customClassNames,
                )}
              >
                {!readOnly && (
                  <button
                    type="button"
                    className="absolute top-[8px] right-[8px] h-[24px] w-[24px]"
                    onClick={() => handleRemove(index)}
                  >
                    <img
                      src={
                        closeImg === 'blue'
                          ? '/img/icons/close.svg'
                          : '/img/icons/close_white.svg'
                      }
                      alt="Remover"
                    />
                  </button>
                )}
                {timeInSeconds && (
                  <span
                    className={twMerge(
                      inter.className,
                      'absolute bottom-[8px] left-[8px] flex h-[20px] w-[25px] items-center justify-center bg-[rgba(1,20,76,0.75)] text-[10px] font-semibold text-white',
                    )}
                  >
                    {`${timeInSeconds}s`}
                  </span>
                )}
                <img
                  className="h-full w-full rounded-[12px] object-cover object-center"
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt="Imagem"
                />
              </div>
            ))}
          {canAddMoreFiles && (
            <label
              htmlFor={id || name}
              className={twMerge(
                fustat.className,
                'text-primary relative flex h-[200px] w-[200px] flex-col items-center justify-center gap-[10px] text-[18px] font-bold',
                customClassNames,
                readOnly
                  ? 'hidden'
                  : 'border-primary20 bg-white2 justify-center rounded-[0.75rem] border-1',
              )}
            >
              <img
                width={32}
                height={32}
                src="/img/icons/plus.svg"
                alt="Adicionar"
              />
              Adicionar Foto
              <input
                id={id || name}
                type="file"
                accept="image/*"
                disabled={disabled}
                readOnly={readOnly}
                className="hidden"
                name={name}
                {...rest}
                ref={ref}
              />
            </label>
          )}
          {readOnly && files.length === 0 && noFilesMessage && (
            <div
              className={twMerge(
                fustat.className,
                'text-primary border-primary20 bg-white2 relative flex h-[200px] w-[200px] flex-col items-center justify-center gap-[10px] rounded-[0.75rem] border-1 text-[18px] font-bold',
                customClassNames,
              )}
            >
              {noFilesMessage}
            </div>
          )}
        </div>
      </div>
      {error && (
        <span className="text-warning text-[10px] font-normal">{error}</span>
      )}
    </div>
  );
};

export default forwardRef(InputFile);
