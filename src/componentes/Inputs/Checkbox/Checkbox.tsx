import React, {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  ChangeEvent,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: ReactNode;
  handleChange?: (checked: boolean) => void;
  onChange?:
    | ((checked: boolean) => void)
    | ((e: ChangeEvent<HTMLInputElement>) => void);
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { label, name, id, handleChange, onChange, checked, defaultChecked, ...rest },
  ref,
) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    // 🔹 Controller (espera boolean)
    if (onChange && onChange.length === 1) {
      (onChange as (checked: boolean) => void)(value);
    } else if (onChange) {
      (onChange as (e: ChangeEvent<HTMLInputElement>) => void)(e);
    }

    if (handleChange) handleChange(value);
  };

  return (
    <div className="flex flex-row items-center gap-[8px]">
      <input
        id={id || name}
        name={name}
        type="checkbox"
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleInputChange}
        {...rest}
        className="peer absolute h-[24px] w-[24px] cursor-pointer opacity-0"
      />

      <label
        htmlFor={id || name}
        className="border-primary80 bg-white2 peer-checked:border-success peer-checked:bg-success h-[24px] w-[24px] cursor-pointer rounded-[6px] border-1 bg-[length:12px_12px] bg-center bg-no-repeat transition-all peer-checked:bg-[url('/img/icons/check.svg')]"
      />

      <span className={twMerge('text-white2 text-[14px] font-normal')}>
        {label}
      </span>
    </div>
  );
};

export default forwardRef(Checkbox);
