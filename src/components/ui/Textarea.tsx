import React from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "block w-full rounded-md border-gray-300 shadow-sm",
          "focus:border-blue-500 focus:ring-blue-500",
          "disabled:bg-gray-50 disabled:text-gray-500",
          className
        )}
        {...props}
      />
    </div>
  );
}