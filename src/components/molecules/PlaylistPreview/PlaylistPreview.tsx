import Image from 'next/image';
import Typography from '~/components/atoms/Typography';
import { SpotifyPlaylist } from '~/utils/spotify';

type PlaylistPreviewProps = { playlist: SpotifyPlaylist };

const PlaylistPreview = ({ playlist }: PlaylistPreviewProps) => (
    <div className='w-32'>
        <Image
            src={playlist.images[0].url}
            width={20}
            height={20}
            alt={playlist.name}
            layout='responsive'
            className='rounded-xl bg-zinc-700'
        />
        <Typography
            title={playlist.name}
            className='mt-1 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-xs'
        />
    </div>
);

export default PlaylistPreview;
