import { forwardRef } from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

const Subtitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ children, className, ...otherProps }, ref) => (
        <h2 className={otc(`text-lg ${className}`)} {...{ ref, ...otherProps }}>
            {children}
        </h2>
    )
);

export default Subtitle;
