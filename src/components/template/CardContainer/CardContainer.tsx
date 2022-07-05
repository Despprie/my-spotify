import { useRef } from 'react';
import { overrideTailwindClasses as otc } from 'tailwind-override';

type CardContainerProps = React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode };

const CardContainer = ({ children, className, onMouseMove, ...otherProps }: CardContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const _onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!containerRef.current) return;

        const { x, y } = containerRef.current.getBoundingClientRect();
        containerRef.current.style.setProperty('--x', `${event.clientX - x}`);
        containerRef.current.style.setProperty('--y', `${event.clientY - y}`);
    };

    return (
        <div
            ref={containerRef}
            className={otc(`background-blur rounded-md border-2 border-zinc-800 bg-zinc-800/50 p-4 ${className}`)}
            onMouseMove={_onMouseMove}
            {...otherProps}
        >
            {children}
        </div>
    );
};

export default CardContainer;
