import { useQuery } from 'react-query';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify, SpotifyPlaylist } from '~/utils/spotify';

export type SpotifyUserPlaylistResponse = {
    href: string;
    items: SpotifyPlaylist[];
    limit: number;
    next: string | null;
    previous: string | null;
    total: number;
};

const getUserPlaylists = async (accessToken: string, limit: number = 20, offset: number = 0) => {
    const response = await spotify.get<SpotifyUserPlaylistResponse>(`/me/playlists?limit=${limit}&offset=${offset}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
};

const useUserPlaylists = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const featuredPlayListsQuery = useQuery(
        ['spotify', 'user-playlist', accessToken],
        () => getUserPlaylists(accessToken!),
        {
            enabled: !!accessToken
        }
    );

    return featuredPlayListsQuery;
};

export default useUserPlaylists;
