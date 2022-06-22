import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Button from '~/components/atoms/Button/Button';

describe('Button', () => {
    it('should render "Hello, World!" when passed as children', () => {
        const { getByText } = render(<Button>Hello, World!</Button>);
        const content = getByText('Hello, World!');
        expect(content).toBeInTheDocument();
    });

    it('should render "Hello, World!" when passed as props', () => {
        const { getByText } = render(<Button title='Hello, World!' />);
        const content = getByText('Hello, World!');
        expect(content).toBeInTheDocument();
    });

    it('should pass props to button', () => {
        const onClickButton = jest.fn();

        const { getByRole } = render(<Button onClick={onClickButton} />);
        const button = getByRole('button');

        fireEvent.click(button);
        expect(onClickButton).toHaveBeenCalledTimes(1);
    });

    it('should render the primary button', () => {
        const { getByRole } = render(<Button theme='primary' />);
        const button = getByRole('button');
        expect(button).toHaveClass('bg-green-500');
    });
});
