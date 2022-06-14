import Image from 'next/image';
import Typography from '~/components/atoms/Typography';
import { SpotifyArtist } from '~/utils/spotify';

type ArtistsPreviewProps = { artist: SpotifyArtist };

const ArtistPreview = ({ artist }: ArtistsPreviewProps) => (
    <div className='w-24'>
        <Image
            src={artist.images[0].url}
            width={10}
            height={10}
            alt={artist.name}
            layout='responsive'
            className='rounded-full'
        />
        <Typography
            title={artist.name}
            className='mt-1 overflow-x-hidden overflow-ellipsis whitespace-nowrap text-center text-xs'
        />
    </div>
);

export default ArtistPreview;
