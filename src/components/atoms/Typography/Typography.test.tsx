import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Typography from '~/components/atoms/Typography/Typography';

describe('Typography', () => {
    it('should render "Hello, World!" as a paragraph when passed as children', () => {
        const { getByText } = render(<Typography>Hello, World!</Typography>);
        const content = getByText('Hello, World!');
        expect(content instanceof HTMLParagraphElement).toBeTruthy();
        expect(content).toBeInTheDocument();
    });

    it('should render "Hello, World!" as a paragraph when passed as props', () => {
        const { getByText } = render(<Typography title='Hello, World!' />);
        const content = getByText('Hello, World!');
        expect(content instanceof HTMLParagraphElement).toBeTruthy();
        expect(content).toBeInTheDocument();
    });

    it('should render "Hello, World!" as a title when passed as children', () => {
        const { getByText } = render(<Typography theme='title'>Hello, World!</Typography>);
        const content = getByText('Hello, World!');
        expect(content).toBeInTheDocument();
        expect(content).toHaveClass('text-2xl');
        expect(content instanceof HTMLHeadingElement).toBeTruthy();
    });

    it('should render "Hello, World!" as a title when passed as props', () => {
        const { getByText } = render(<Typography theme='title' title='Hello, World!' />);
        const content = getByText('Hello, World!');
        expect(content).toBeInTheDocument();
        expect(content).toHaveClass('text-2xl');
        expect(content instanceof HTMLHeadingElement).toBeTruthy();
    });

    it('should render "Hello, World!" as a subtitle when passed as children', () => {
        const { getByText } = render(<Typography theme='subtitle'>Hello, World!</Typography>);
        const content = getByText('Hello, World!');
        expect(content).toBeInTheDocument();
        expect(content).toHaveClass('text-lg');
        expect(content instanceof HTMLHeadingElement).toBeTruthy();
    });

    it('should render "Hello, World!" as a subtitle when passed as props', () => {
        const { getByText } = render(<Typography theme='subtitle' title='Hello, World!' />);
        const content = getByText('Hello, World!');
        expect(content).toBeInTheDocument();
        expect(content).toHaveClass('text-lg');
        expect(content instanceof HTMLHeadingElement).toBeTruthy();
    });
});
