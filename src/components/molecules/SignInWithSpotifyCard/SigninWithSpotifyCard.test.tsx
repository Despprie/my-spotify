import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import SignInWithSpotifyCard from '~/components/molecules/SignInWithSpotifyCard';
import requestSpotifyAuthorization from '~/utils/requestSpotifyAuthorization';

jest.mock('~/utils/requestSpotifyAuthorization');

describe('SigninWithSpotifyCard', () => {
    it('should request Spotify authorization when button clicked', () => {
        const { getByRole } = render(<SignInWithSpotifyCard />);
        const button = getByRole('button');
        fireEvent.click(button);
        expect(requestSpotifyAuthorization).toHaveBeenCalledTimes(1);
    });
});
