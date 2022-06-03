import { v4 as uuid } from 'uuid';
import Typography from '~/components/atoms/Typography';
import PlaylistPreview from '~/components/molecules/PlaylistPreview';
import useFeaturedPlaylists from '~/hooks/useFeaturedPlaylists';

const FeaturedPlaylistsSection = () => {
    const featuredPlayListsQuery = useFeaturedPlaylists();

    return (
        <div>
            <Typography theme='subtitle' title='Featured Playlists' className='mb-2 font-medium' />
            <ul className='flex w-full gap-4 overflow-x-auto py-1'>
                {featuredPlayListsQuery.isSuccess &&
                    featuredPlayListsQuery.data.items.map(playlist => (
                        <li key={uuid()}>
                            <PlaylistPreview {...{ playlist }} />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default FeaturedPlaylistsSection;
