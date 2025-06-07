import React, { createContext, useContext } from 'react';
import { cn } from '../../lib/utils';

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('useRadioGroup must be used within a RadioGroup');
  }
  return context;
};

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, disabled = false, name, children, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ name, value, onValueChange, disabled }}>
        <div
          ref={ref}
          className={cn("grid gap-2", className)}
          role="radiogroup"
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
  id: string;
  disabled?: boolean;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, id, disabled, ...props }, ref) => {
    const { name, value: groupValue, onValueChange, disabled: groupDisabled } = useRadioGroup();
    const isChecked = value === groupValue;
    const isDisabled = disabled || groupDisabled;

    return (
      <input
        ref={ref}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={(e) => {
          if (onValueChange && e.target.checked) {
            onValueChange(value);
          }
        }}
        className={cn(
          "aspect-square h-4 w-4 border border-gray-300 text-black  disabled:cursor-not-allowed disabled:opacity-50",
          "before:content-[''] before:block before:w-2 before:h-2 before:rounded-full  before:opacity-0 checked:before:opacity-100 before:transition-opacity before:mx-auto before:my-auto",
          className
        )}
        {...props}
      />
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";