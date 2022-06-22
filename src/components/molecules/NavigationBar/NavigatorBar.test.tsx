import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as NextRouter from 'next/router';
import NavigationBar from '~/components/molecules/NavigationBar';

jest.mock('next/router');
const useRouterSpy = jest.spyOn(NextRouter, 'useRouter');

describe('NavigatorBar', () => {
    it('should render with home icon selected', () => {
        useRouterSpy.mockReturnValue({ pathname: '/' } as NextRouter.NextRouter);

        const { getByText } = render(<NavigationBar />);
        const content = getByText('Home');
        expect(content).not.toHaveClass('text-gray-500');
    });

    it('should render with search icon selected', () => {
        useRouterSpy.mockReturnValue({ pathname: '/search' } as NextRouter.NextRouter);

        const { getByText } = render(<NavigationBar />);
        const content = getByText('Search');
        expect(content).not.toHaveClass('text-gray-500');
    });

    it('should render with library icon selected', () => {
        useRouterSpy.mockReturnValue({ pathname: '/library' } as NextRouter.NextRouter);

        const { getByText } = render(<NavigationBar />);
        const content = getByText('Library');
        expect(content).not.toHaveClass('text-gray-500');
    });
});
