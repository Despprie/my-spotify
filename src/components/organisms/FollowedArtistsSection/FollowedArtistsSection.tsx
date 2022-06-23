import { v4 as uuid } from 'uuid';
import SectionPreview from '~/components/molecules/SectionPreview';
import HomeSection from '~/components/template/HomeSection';
import useFollowedArtists from '~/hooks/useFollowedArtists';

const FollowedArtistsSection = () => {
    const followedArtistsQuery = useFollowedArtists();

    return (
        <HomeSection title='Artists you follow'>
            {followedArtistsQuery.isSuccess &&
                followedArtistsQuery.data.items.map(artist => (
                    <li key={uuid()}>
                        <SectionPreview item={artist} />
                    </li>
                ))}
        </HomeSection>
    );
};

export default FollowedArtistsSection;
