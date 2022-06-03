import { useQuery } from 'react-query';
import useInvalidateSpotifyTokens from '~/hooks/useInvalidateSpotifyTokens';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import spotify from '~/utils/spotify';

export type SpotifyImage = {
    url: string;
    width: number;
    height: number;
};

export type SpotifyUser = {
    id: string;
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    type: string;
    uri: string;
};

export type SpotifyPlaylistItem = {
    id: string;
    name: string;
    description: string;
    images: SpotifyImage[];
    owner: SpotifyUser;
    tracks: { href: string };
    external_urls: { spotify: string };
    href: string;
    collaborative: boolean;
    uri: string;
    type: string;
    snapshot_id: string;
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

const getFeaturedPlaylists = async (accessToken: string) => {
    const response = await spotify.get<SpotifyFeaturedPlaylist>('/browse/featured-playlists/', {
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
