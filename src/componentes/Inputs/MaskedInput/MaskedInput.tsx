import { InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  maskFunction?: (value: string) => string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaskedInput: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { maskFunction, onChange, ...rest },
  ref,
) => {
  const handleMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskFunction
      ? maskFunction(event.target.value)
      : event.target.value;
    event.target.value = masked;
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <input
      className="form-control outline-none"
      type="text"
      onChange={handleMask}
      {...rest}
      ref={ref}
    />
  );
};

export default forwardRef(MaskedInput);
