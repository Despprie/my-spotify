import Image from 'next/image';
import Typography from '~/components/atoms/Typography';
import { SpotifyPlaylistItem } from '~/hooks/useFeaturedPlaylists';

type PlaylistPreviewProps = { playlist: SpotifyPlaylistItem };

const PlaylistPreview = ({ playlist }: PlaylistPreviewProps) => (
    <div className='w-48 rounded-md'>
        <Image
            src={playlist.images[0].url}
            width={30}
            height={30}
            alt={playlist.name}
            layout='responsive'
            className='rounded-md'
        />
        <Typography
            title={playlist.name}
            className='mt-2 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-base font-medium text-gray-500'
        />
    </div>
);

export default PlaylistPreview;
