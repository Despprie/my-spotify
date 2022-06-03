import { useQuery } from 'react-query';
import useInvalidateSpotifyTokens from '~/hooks/useInvalidateSpotifyTokens';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import spotify from '~/utils/spotify';

export type SpotifyFeaturedPlaylist = {
    playlists: {
        href: string;
        items: [{}];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
    message: 'string';
};

const getFeaturedPlaylists = async (accessToken: string, offset: number = 0, limit: number = 20) => {
    const response = await spotify.get<SpotifyFeaturedPlaylist>(`/browse/featured-playlists/${offset}/${limit}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

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
