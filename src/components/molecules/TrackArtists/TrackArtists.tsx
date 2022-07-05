import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import Typography from '~/components/atoms/Typography';
import { SpotifyArtist } from '~/utils/spotify';

type TrackArtistsProps = { artists: SpotifyArtist[] };

const TrackArtists = ({ artists }: TrackArtistsProps) => (
    // todo : find a way to truncate artists list
    <ul className='flex gap-1 overflow-hidden'>
        {artists.map((artist, index, artists) => (
            <li key={uuid()}>
                <Link href='#'>
                    <Typography
                        title={artist.name + (index !== artists.length - 1 ? ',' : '')}
                        className='cursor-pointer truncate text-gray-500 hover:text-green-500'
                    />
                </Link>
            </li>
        ))}
    </ul>
);

export default TrackArtists;
