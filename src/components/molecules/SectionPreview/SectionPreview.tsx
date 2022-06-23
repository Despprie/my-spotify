import Image from 'next/image';
import Typography from '~/components/atoms/Typography';
import { SpotifyAlbum, SpotifyArtist, SpotifyPlaylist, SpotifyTrack } from '~/utils/spotify';

type PlaylistPreviewProps = { item: SpotifyPlaylist | SpotifyAlbum | SpotifyTrack | SpotifyArtist };

const SectionPreview = ({ item }: PlaylistPreviewProps) => (
    <div
        className={`cursor-pointer ${
            'followers' in item
                ? 'w-24 lg:w-36'
                : 'w-36 rounded-md border-[1px] border-zinc-700 bg-zinc-800/50 p-2 lg:w-44'
        }`}
    >
        <Image
            src={'album' in item ? item.album.images[0].url : item.images[0].url}
            width={20}
            height={20}
            alt={item.name}
            layout='responsive'
            className={`bg-zinc-800 ${'followers' in item ? 'rounded-full' : 'rounded-md'}`}
        />
        <Typography
            title={item.name}
            className={`mt-1 truncate text-sm font-light lg:mt-2 lg:text-base ${
                'followers' in item ? 'text-center' : ''
            }`}
        />
    </div>
);

export default SectionPreview;
