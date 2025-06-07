import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, disabled, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => {
            if (onCheckedChange) {
              onCheckedChange(e.target.checked);
            }
          }}
          className={cn(
            "peer h-4 w-4 shrink-0 border border-gray-300 focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "checked:bg-black checked:border-black",
            className
          )}
          {...props}
        />
        <Check 
          className={cn(
            "absolute h-3 w-3 text-white pointer-events-none transition-opacity",
            "opacity-0 peer-checked:opacity-100",
            "left-0.5 top-0.5"
          )}
        />
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";