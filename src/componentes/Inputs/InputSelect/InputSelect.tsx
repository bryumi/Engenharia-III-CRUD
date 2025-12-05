'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

import { ArrowDown, Check } from 'lucide-react';

interface OptionType {
  label: string;
  value: string | number;
}

interface Props {
  label?: string;
  placeholder?: string;
  error?: string;
  isDisabled?: boolean;
  isMulti?: boolean;
  options: OptionType[];
  value: OptionType[] | OptionType | null;
  onChange: (v: OptionType[] | OptionType | null) => void;
}

export function InputSelect({
  label,
  placeholder = 'Selecione',
  error,
  isDisabled,
  isMulti,
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  // Lógica de seleção
  const toggleValue = (option: OptionType) => {
    if (!isMulti) return onChange(option);

    const current = Array.isArray(value) ? value : [];
    const exists = current.some(v => v.value === option.value);

    if (exists) {
      onChange(current.filter(v => v.value !== option.value));
    } else {
      onChange([...current, option]);
    }
  };

  const isSelected = (opt: OptionType) => {
    if (!value) return false;
    if (!isMulti) {
      const val = Array.isArray(value) ? undefined : value;
      return val?.value === opt.value;
    }
    return (value as OptionType[]).some(v => v.value === opt.value);
  };

  return (
    <div className="relative flex w-full flex-col gap-1">
      {label && (
        <label className="text-neutral flex h-[14px] items-center gap-2 text-[14px] leading-[24px] font-normal">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <button
            disabled={isDisabled}
            className="flex h-[56px] w-full items-center rounded-lg border bg-white px-4 py-2 text-sm"
            type="button"
            style={{ padding: '16px' }}
          >
            {/* Left: content */}
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-neutral-400">
              {!value || (Array.isArray(value) && value.length === 0)
                ? placeholder
                : isMulti
                  ? (value as OptionType[]).map(v => v.label).join(', ')
                  : (value as OptionType).label}
            </div>

            {/* Right: icon */}
            <div className="ml-3 flex items-center">
              <ArrowDown
                className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="border-primary-100 scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-gray-100 z-[99999] max-h-40 w-[var(--radix-popover-trigger-width)] overflow-auto rounded-b-lg border-t-0 bg-white p-4">
          <ul className="flex flex-col">
            {options.map(option => (
              <li
                key={option.value}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
                onClick={() => toggleValue(option)}
                style={{ padding: '8px' }}
              >
                {isMulti && (
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      isSelected(option)
                        ? 'bg-primary-100 border-primary-100'
                        : 'border-neutral-400'
                    }`}
                  >
                    {isSelected(option) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                )}

                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>

      {error && (
        <span className="text-error-100 font-montserrat absolute -bottom-4 left-1 text-xs">
          {error}
        </span>
      )}
    </div>
  );
}
