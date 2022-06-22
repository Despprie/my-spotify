import { forwardRef } from 'react';
import Paragraph from '~/components/atoms/Typography/Paragraph';
import Subtitle from '~/components/atoms/Typography/Subtitle';
import Title from '~/components/atoms/Typography/Title';

type TypographyProps = React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> & {
    theme?: 'title' | 'subtitle' | 'paragraph';
    title?: string;
};

const Typography = forwardRef<HTMLHeadingElement | HTMLParagraphElement, TypographyProps>(
    ({ theme, title, children, ...otherProps }, ref) => {
        switch (theme) {
            case 'title':
                return <Title {...{ ref, ...otherProps }}>{title ?? children}</Title>;
            case 'subtitle':
                return <Subtitle {...{ ref, ...otherProps }}>{title ?? children}</Subtitle>;
            default:
            case 'paragraph':
                return <Paragraph {...{ ref, ...otherProps }}>{title ?? children}</Paragraph>;
        }
    }
);

export default Typography;
