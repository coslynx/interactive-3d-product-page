import React from 'react';

/**
 * Bounded component limits content width and centers it horizontally.
 *
 * @component
 * @param {string} [maxWidth='8xl'] - Maximum width of the content using Tailwind CSS sizing scales.
 * @param {string} [className=''] - Optional CSS class name for additional styling.
 * @returns {React.ReactElement} A div element with the specified max width and centered content.
 *
 * @example
 * <Bounded maxWidth="md" className="my-4">
 *   {children}
 * </Bounded>
 */
export interface BoundedProps {
  maxWidth?: string;
  className?: string;
  children: React.ReactNode;
}

const Bounded: React.FC<BoundedProps> = React.memo(function BoundedComponent({ maxWidth = '8xl', className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-[${maxWidth}] ${className}`}>
      {children}
    </div>
  );
});

export default Bounded;