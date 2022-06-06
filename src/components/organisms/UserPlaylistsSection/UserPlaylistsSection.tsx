import { v4 as uuid } from 'uuid';
import Icon from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';
import PlaylistPreview from '~/components/molecules/PlaylistPreview';
import useUserPlaylists from '~/hooks/useUserPlaylists';

const UserPlaylistsSection = () => {
    const userPlayListsQuery = useUserPlaylists();

    return (
        <div>
            <div className='mb-2 flex items-center justify-between px-2'>
                <Typography theme='subtitle' title='Your Playlists' />
                <button>
                    <Icon theme='cheveron' />
                </button>
            </div>
            <ul className='disable-scrollbar flex w-full gap-2 overflow-x-auto px-2 py-1'>
                {userPlayListsQuery.isSuccess &&
                    userPlayListsQuery.data.items.map(playlist => (
                        <li key={uuid()}>
                            <PlaylistPreview {...{ playlist }} />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default UserPlaylistsSection;
