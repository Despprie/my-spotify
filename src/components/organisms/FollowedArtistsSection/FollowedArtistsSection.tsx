import { v4 as uuid } from 'uuid';
import ArtistPreview from '~/components/molecules/ArtistPreview';
import HomeSection from '~/components/template/HomeSection';
import useFollowedArtists from '~/hooks/useFollowedArtists';

const FollowedArtistsSection = () => {
    const followedArtistsQuery = useFollowedArtists();

    return (
        <HomeSection title='Artists you follow'>
            {followedArtistsQuery.isSuccess &&
                followedArtistsQuery.data.items.map(artist => (
                    <li key={uuid()}>
                        <ArtistPreview {...{ artist }} />
                    </li>
                ))}
        </HomeSection>
    );
};

export default FollowedArtistsSection;
