import { v4 as uuid } from 'uuid';
import Icon from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';
import PlaylistPreview from '~/components/molecules/PlaylistPreview';
import useFeaturedPlaylists from '~/hooks/useFeaturedPlaylists';

const FeaturedPlaylistsSection = () => {
    const featuredPlayListsQuery = useFeaturedPlaylists();

    return (
        <>
            <div className='mb-2 flex items-center justify-between px-2'>
                <Typography theme='subtitle' title='Featured Playlists' />
                <button>
                    <Icon theme='cheveron' />
                </button>
            </div>
            <ul className='disable-scrollbar flex w-full gap-2 overflow-x-auto px-2 py-1'>
                {featuredPlayListsQuery.isSuccess &&
                    featuredPlayListsQuery.data.items.map(playlist => (
                        <li key={uuid()}>
                            <PlaylistPreview {...{ playlist }} />
                        </li>
                    ))}
            </ul>
        </>
    );
};

export default FeaturedPlaylistsSection;
