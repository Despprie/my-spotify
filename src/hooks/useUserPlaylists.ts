import { useQuery } from 'react-query';
import useInvalidateSpotifyTokens from '~/hooks/useInvalidateSpotifyTokens';
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
    const invalidateSpotifyTokens = useInvalidateSpotifyTokens();

    const featuredPlayListsQuery = useQuery(['user-playlist', accessToken], () => getUserPlaylists(accessToken!), {
        enabled: !!accessToken,
        onError: invalidateSpotifyTokens
    });

    return featuredPlayListsQuery;
};

export default useUserPlaylists;
