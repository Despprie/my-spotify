import { forwardRef } from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

const Primary = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ children, className, ...otherProps }, ref) => (
        <button
            className={otc(`rounded-md bg-green-500 px-4 py-2 font-medium ${className}`)}
            {...{ ref, ...otherProps }}
        >
            {children}
        </button>
    )
);

export default Primary;
