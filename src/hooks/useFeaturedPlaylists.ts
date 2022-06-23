import { useQuery } from 'react-query';
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

const getFeaturedPlaylists = async (accessToken: string, limit: number, offset: number) => {
    const response = await spotify.get<SpotifyFeaturedPlaylistResponse>(
        `/browse/featured-playlists?limit=${limit}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

const useFeaturedPlaylists = (limit: number = 20, offset: number = 0) => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const featuredPlayListsQuery = useQuery(
        ['spotify', 'featured-playlist', limit, offset, accessToken],
        () => getFeaturedPlaylists(accessToken!, limit, offset),
        {
            enabled: !!accessToken,
            select: ({ playlists }) => playlists
        }
    );

    return featuredPlayListsQuery;
};

export default useFeaturedPlaylists;
