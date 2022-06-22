import { forwardRef } from 'react';

const Paragraph = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ children, ...otherProps }, ref) => <p {...{ ref, ...otherProps }}>{children}</p>
);

export default Paragraph;
