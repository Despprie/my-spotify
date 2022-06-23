import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import HomeHeader from '~/components/organisms/HomeHeader/HomeHeader';
import useCurrentUser from '~/hooks/useCurrentUser';

const IMAGE_URL = 'https://i.scdn.co/image/ab67706c0000bebb4708c58376ddb3692f8d09bf';

jest.mock('~/hooks/useCurrentUser', () => ({ __esModule: true, default: jest.fn() }));
const useCurrentUserMock = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>;

describe('HomeHeader', () => {
    it('should render a basic header', () => {
        useCurrentUserMock.mockReturnValue({ isSuccess: false, data: undefined } as ReturnType<typeof useCurrentUser>);

        const { getByText, queryByAltText } = render(<HomeHeader />);

        const title = getByText('Welcome back!');
        const profilePicture = queryByAltText('profile picture');

        expect(title).toBeInTheDocument();
        expect(profilePicture).toEqual(null);
    });

    it('should render a hydrated header', () => {
        useCurrentUserMock.mockReturnValue({
            isSuccess: true,
            data: { id: 'foobar', images: [{ url: IMAGE_URL }], followers: { total: 123 } }
        } as ReturnType<typeof useCurrentUser>);

        const { getByText, queryByAltText } = render(<HomeHeader />);

        const title = getByText('Welcome back foobar!');
        const profilePicture = queryByAltText('profile picture');

        expect(title).toBeInTheDocument();
        expect(profilePicture).toBeInTheDocument();
    });
});
