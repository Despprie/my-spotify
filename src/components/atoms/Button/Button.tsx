import { forwardRef } from 'react';
import Primary from '~/components/atoms/Button/Primary';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { theme?: 'primary'; title?: string };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ theme, title, children, ...otherProps }, ref) => {
    switch (theme) {
        case 'primary':
            return <Primary {...{ ref, ...otherProps }}>{title ?? children}</Primary>;
        default:
            return <button {...{ ref, ...otherProps }}>{title ?? children}</button>;
    }
});

export default Button;
