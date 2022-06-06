import { useQuery } from 'react-query';
import useInvalidateSpotifyTokens from '~/hooks/useInvalidateSpotifyTokens';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import spotify, { SpotifyImage, SpotifyUser } from '~/utils/spotify';

export type SpotifyPlaylistItem = {
    id: string;
    name: string;
    description: string;
    collaborative: boolean;
    images: SpotifyImage[];
    tracks: { href: string };
    owner: SpotifyUser;
    external_urls: { spotify: string };
    snapshot_id: string;
    uri: string;
    href: string;
    type: string;
};

export type SpotifyFeaturedPlaylist = {
    playlists: {
        href: string;
        items: SpotifyPlaylistItem[];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
    message: 'string';
};

const getFeaturedPlaylists = async (accessToken: string, limit: number = 20, offset: number = 0) => {
    const response = await spotify.get<SpotifyFeaturedPlaylist>(
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
