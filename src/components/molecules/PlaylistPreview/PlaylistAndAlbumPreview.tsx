import Image from 'next/image';
import Typography from '~/components/atoms/Typography';
import { SpotifyAlbum, SpotifyPlaylist } from '~/utils/spotify';

type PlaylistPreviewProps = { item: SpotifyPlaylist | SpotifyAlbum };

const PlaylistAndAlbumPreview = ({ item }: PlaylistPreviewProps) => (
    <div className='w-32'>
        <Image
            src={item.images[0].url}
            width={20}
            height={20}
            alt={item.name}
            layout='responsive'
            className='rounded-xl bg-zinc-700'
        />
        <Typography title={item.name} className='mt-1 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-xs' />
    </div>
);

export default PlaylistAndAlbumPreview;
