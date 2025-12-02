import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import MaskedInput from '../MaskedInput/MaskedInput';
import { LockIcon } from 'lucide-react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  maxwidthClassName?: string;
  maskFunction?: (value: string) => string;
  showPasswordButton?: boolean;
  buttons?: ReactNode;
  lock?: boolean;
  lockColor?: string;
  directionClassName?: 'flex-col' | 'flex-row';
}

const Input2: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  {
    id,
    readOnly,
    disabled,
    label,
    description,
    name,
    error,
    maskFunction,
    showPasswordButton,
    type,
    maxwidthClassName,
    buttons,
    lock,
    lockColor,
    directionClassName = 'flex-col',
    ...rest
  }: Props,
  ref,
) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={twMerge(
        'flex w-full gap-2',
        maxwidthClassName,
        directionClassName,
      )}
    >
      <div className={twMerge('flex w-full gap-[4px]', directionClassName)}>
        {label && (
          <div className="flex items-center justify-between">
            <label
              className="text-neutral flex h-[14px] items-center gap-2 text-[14px] leading-[24px] font-normal"
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
            'border-primary20 bg-white2 relative flex h-[56px] w-full items-center justify-center rounded-[0.75rem] border-1',
          )}
        >
          <MaskedInput
            id={id || name}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete="off"
            className={twMerge(
              'text-neutral80 placeholder:text-primary20 h-full w-full rounded-[0.75rem] p-[18px_16px]! text-[14px] font-normal',
              type === 'password' ? 'pr-[40px]!' : '',
            )}
            name={name}
            maskFunction={maskFunction}
            type={type === 'password' ? (show ? 'text' : 'password') : type}
            {...rest}
            ref={ref}
          />
          {type === 'password' &&
            (showPasswordButton === undefined || showPasswordButton) && (
              <button
                className="absolute top-1/2 right-[16px] flex translate-y-[-50%] items-center justify-center border-none bg-transparent"
                type="button"
                onClick={() => setShow(prev => !prev)}
              >
                <img
                  width={24}
                  height={24}
                  src={
                    show ? '/img/icons/eye_on.svg' : '/img/icons/eye_off.svg'
                  }
                  alt="Alternar mostrar senha"
                />
              </button>
            )}
          {disabled && lock && (
            <div className="absolute top-1/2 right-[16px] flex translate-y-[-50%] items-center justify-center border-none bg-transparent">
              <LockIcon color={lockColor} />
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

export default forwardRef(Input2);
