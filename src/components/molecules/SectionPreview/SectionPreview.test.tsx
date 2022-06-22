import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import SectionItemPreview from '~/components/molecules/SectionPreview/SectionPreview';
import { SpotifyAlbum, SpotifyPlaylist, SpotifyTrack } from '~/utils/spotify';

describe('SectionPreview', () => {
    const IMAGE_URL = 'https://i.scdn.co/image/ab67706c0000bebb4708c58376ddb3692f8d09bf';

    it('should render a spotify playlist preview', () => {
        const item = { name: 'Playlist', images: [{ url: IMAGE_URL }] } as SpotifyPlaylist;
        const { getByText, getByAltText } = render(<SectionItemPreview {...{ item }} />);

        const title = getByText('Playlist');
        const image = getByAltText('Playlist');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });

    it('should render a spotify album preview', () => {
        const item = { name: 'Album', images: [{ url: IMAGE_URL }] } as SpotifyAlbum;
        const { getByText, getByAltText } = render(<SectionItemPreview {...{ item }} />);

        const title = getByText('Album');
        const image = getByAltText('Album');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });

    it('should render a spotify track preview', () => {
        const item = { name: 'Track', album: { images: [{ url: IMAGE_URL }] } } as SpotifyTrack;
        const { getByText, getByAltText } = render(<SectionItemPreview {...{ item }} />);

        const title = getByText('Track');
        const image = getByAltText('Track');

        expect(title).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });
});
