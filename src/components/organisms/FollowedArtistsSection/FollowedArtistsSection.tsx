import { v4 as uuid } from 'uuid';
import Icon from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';
import ArtistPreview from '~/components/molecules/ArtistPreview';
import useFollowedArtists from '~/hooks/useFollowedArtists';

const FollowedArtistsSection = () => {
    const followedArtistsQuery = useFollowedArtists();

    return (
        <div>
            <div className='mb-2 flex items-center justify-between px-2'>
                <Typography theme='subtitle' title='Followed Artists' />
                <button>
                    <Icon theme='cheveron' />
                </button>
            </div>
            <ul className='disable-scrollbar flex w-full gap-2 overflow-x-auto px-2 py-1'>
                {followedArtistsQuery.isSuccess &&
                    followedArtistsQuery.data.items.map(artist => (
                        <li key={uuid()}>
                            <ArtistPreview {...{ artist }} />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default FollowedArtistsSection;
