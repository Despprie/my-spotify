import { useQuery } from 'react-query';
import useInvalidateSpotifyTokens from '~/hooks/useInvalidateSpotifyTokens';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify, SpotifyPlaylist } from '~/utils/spotify';

export type SpotifyFeaturedPlaylistResponse = {
    playlists: {
        href: string;
        items: SpotifyPlaylist[];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
    message: 'string';
};

const getFeaturedPlaylists = async (accessToken: string, limit: number = 20, offset: number = 0) => {
    const response = await spotify.get<SpotifyFeaturedPlaylistResponse>(
        `/browse/featured-playlists?limit=${limit}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

const useFeaturedPlaylists = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);
    const invalidateSpotifyTokens = useInvalidateSpotifyTokens();

    const featuredPlayListsQuery = useQuery(
        ['featured-playlist', accessToken],
        () => getFeaturedPlaylists(accessToken!),
        {
            enabled: !!accessToken,
            select: ({ playlists }) => playlists,
            onError: invalidateSpotifyTokens
        }
    );

    return featuredPlayListsQuery;
};

export default useFeaturedPlaylists;
