import React from 'react';
import { BaseProps } from '../@types/common';
import { twMerge } from 'tailwind-merge';

type RadioButtonVariant = 'default' | 'outlined' | 'colored';

type Props = BaseProps & {
  label?: string;
  value: string;
  checked: boolean;
  name: string;
  disabled?: boolean;
  hint?: string;
  variant?: RadioButtonVariant;
  onChange?: (value: string) => void;
};

const variantStyles: Record<RadioButtonVariant, string> = {
  default: 'border-aws-font-color/50 after:bg-aws-sea-blue',
  outlined: 'border-gray-300 after:bg-aws-sea-blue',
  colored: 'border-aws-sea-blue after:bg-aws-sea-blue',
};

const RadioButton: React.FC<Props> = ({
  label,
  value,
  checked,
  name,
  disabled = false,
  hint,
  variant = 'default',
  className,
  onChange,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange?.(e.target.value);
    }
  };

  return (
    <div className={twMerge('my-2 flex flex-col pr-3', className)} {...rest}>
      <label
        className={twMerge(
          'relative inline-flex items-center gap-3',
          disabled ? '' : 'cursor-pointer'
        )}>
        <div className="relative shrink-0">
          <input
            type="radio"
            className="peer sr-only"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
          />
          <div
            className={twMerge(
              'h-5 w-5 rounded-full border',
              'after:absolute after:left-1/2 after:top-1/2 after:h-3 after:w-3 after:rounded-full after:-translate-x-1/2 after:-translate-y-1/2',
              'after:transition-all after:content-[""]',
              variantStyles[variant],
              'peer-checked:border-aws-sea-blue peer-checked:after:opacity-100',
              'after:opacity-0',
              disabled ? 'opacity-30' : 'hover:brightness-90'
            )}
          />
        </div>
        {label && (
          <div className="grow">
            <div className="text-sm">{label}</div>
          </div>
        )}
      </label>
      {hint && (
        <div className="ml-8 w-full pl-2 text-xs text-gray">{hint}</div>
      )}
    </div>
  );
};

export default RadioButton;
