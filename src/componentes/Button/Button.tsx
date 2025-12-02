import React, {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: IButtonStyles;
  customClassNames?: string;
  children?: ReactNode;
}

const buttonStyles = {
  primary: 'bg-primary border-primary text-white2 hover:bg-[#00103E]',
  outline_primary:
    'border-primary border-1 bg-white2 text-primary hover:bg-primary40',
  success: 'border-success border-1 bg-white2 text-white2 hover:bg-[#1D4622]',
  alert: 'border-alert border-1 bg-white2 text-white2 hover:bg-[#756430]',
  outline_alert: 'border-alert border-1 bg-white2 text-alert hover:bg-alert2',
  warning: 'border-warning border-1 bg-white2 text-white2 hover:bg-[#772121]',
  warning2: 'border-white border-1 bg-white2 text-warning hover:bg-warning2',
};

export type IButtonStyles = keyof typeof buttonStyles;
const Button: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { buttonStyle = 'primary', customClassNames, children, ...rest },
  ref,
) => {
  return (
    <button
      className={twMerge(
        'flex h-[40px] items-center justify-center gap-[8px] rounded-[8px] p-[7px_32px]! text-[16px] font-extrabold whitespace-nowrap transition-all',
        'disabled:cursor-not-allowed',
        buttonStyles[buttonStyle],
        customClassNames,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  );
};

export default forwardRef(Button);
