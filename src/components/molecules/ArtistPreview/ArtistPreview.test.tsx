import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ArtistPreview from '~/components/molecules/ArtistPreview/ArtistPreview';
import { SpotifyArtist } from '~/utils/spotify';

describe('ArtistPreview', () => {
    const IMAGE_URL = 'https://i.scdn.co/image/ab67706c0000bebb4708c58376ddb3692f8d09bf';
    const artist = { name: 'Artist', images: [{ url: IMAGE_URL }] } as SpotifyArtist;

    it('should render a spotify artist preview', () => {
        const { getByText, getByAltText } = render(<ArtistPreview {...{ artist }} />);

        const title = getByText('Artist');
        const image = getByAltText('Artist');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });
});
