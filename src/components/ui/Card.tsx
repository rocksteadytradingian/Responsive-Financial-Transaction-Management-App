import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md p-6",
        "transition-shadow duration-200",
        "hover:shadow-lg",
        className
      )}
      {...props}
    />
  );
}