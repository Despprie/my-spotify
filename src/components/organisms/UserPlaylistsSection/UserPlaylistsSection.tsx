import { v4 as uuid } from 'uuid';
import SectionItemPreview from '~/components/molecules/SectionPreview';
import HomeSection from '~/components/template/HomeSection';
import useUserPlaylists from '~/hooks/useUserPlaylists';

const UserPlaylistsSection = () => {
    const userPlayListsQuery = useUserPlaylists();

    return (
        <HomeSection title='Your Playlists'>
            {userPlayListsQuery.isSuccess &&
                userPlayListsQuery.data.items.map(playlist => (
                    <li key={uuid()}>
                        <SectionItemPreview item={playlist} />
                    </li>
                ))}
        </HomeSection>
    );
};

export default UserPlaylistsSection;
