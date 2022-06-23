import Image from 'next/image';
import Typography from '~/components/atoms/Typography';
import { SpotifyAlbum, SpotifyPlaylist, SpotifyTrack } from '~/utils/spotify';

type PlaylistPreviewProps = { item: SpotifyPlaylist | SpotifyAlbum | SpotifyTrack };

const SectionItemPreview = ({ item }: PlaylistPreviewProps) => (
    <div className='w-36 rounded-md border-[1px] border-zinc-700 bg-zinc-800/50 p-2'>
        <Image
            src={'album' in item ? item.album.images[0].url : item.images[0].url}
            width={20}
            height={20}
            alt={item.name}
            layout='responsive'
            className='rounded-md bg-zinc-800'
        />
        <Typography
            title={item.name}
            className='mt-1 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-sm font-light'
        />
    </div>
);

export default SectionItemPreview;
