import { forwardRef } from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

const Title = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ children, className, ...otherProps }, ref) => (
        <h1 className={otc(`text-2xl ${className}`)} {...{ ref, ...otherProps }}>
            {children}
        </h1>
    )
);

export default Title;
