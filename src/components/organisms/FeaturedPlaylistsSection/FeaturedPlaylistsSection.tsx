import { v4 as uuid } from 'uuid';
import SectionItemPreview from '~/components/molecules/SectionPreview';
import HomeSection from '~/components/template/HomeSection';
import useFeaturedPlaylists from '~/hooks/useFeaturedPlaylists';

const FeaturedPlaylistsSection = () => {
    const featuredPlayListsQuery = useFeaturedPlaylists();

    return (
        <HomeSection title='Featured Playlists'>
            {featuredPlayListsQuery.isSuccess &&
                featuredPlayListsQuery.data.items.map(playlist => (
                    <li key={uuid()}>
                        <SectionItemPreview item={playlist} />
                    </li>
                ))}
        </HomeSection>
    );
};

export default FeaturedPlaylistsSection;
