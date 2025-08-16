import React from 'react';
import { cn } from '../../lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

/**
 * Button component with primary and secondary variants and hover effects.
 *
 * @component
 * @param {string} label - The text label for the button.
 * @param {() => void} onClick - The function to call when the button is clicked.
 * @param {'primary' | 'secondary'} variant - The visual style of the button.
 * @param {React.ReactNode} icon - Optional icon to display within the button, from lucide-react.
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} props - React Button HTML attributes
 *
 * @example
 * <Button label="Click Me" onClick={() => alert('Clicked!')} variant="primary" />
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, onClick, variant = 'primary', icon, className, ...props }, ref) => {
    const buttonClasses = cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transition-transform transform hover:scale-105 active:scale-100',
      'px-4 py-2',
      className,
      variant === 'primary'
        ? 'bg-primary text-primary-foreground hover:bg-primary/80'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;