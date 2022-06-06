import Image from 'next/image';
import Typography from '~/components/atoms/Typography';
import { SpotifyPlaylistItem } from '~/hooks/useFeaturedPlaylists';
import { SpotifyUserPlaylistItem } from '~/hooks/useUserPlaylists';

type PlaylistPreviewProps = { playlist: SpotifyPlaylistItem | SpotifyUserPlaylistItem };

const PlaylistPreview = ({ playlist }: PlaylistPreviewProps) => (
    <div className='w-32'>
        <Image
            src={playlist.images[0].url}
            width={20}
            height={20}
            alt={playlist.name}
            layout='responsive'
            className='rounded-xl'
        />
        <Typography
            title={playlist.name}
            className='mt-1 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-xs'
        />
    </div>
);

export default PlaylistPreview;
