import { useQuery } from 'react-query';
import useInvalidateSpotifyTokens from '~/hooks/useInvalidateSpotifyTokens';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import spotify, { SpotifyImage } from '~/utils/spotify';

export type SpotifyArtistItem = {
    id: string;
    name: string;
    images: SpotifyImage[];
    followers: { href: string; total: number };
    genres: string[];
    popularity: number;
    external_urls: { spotify: string };
    href: string;
    uri: string;
    type: string;
};

export type SpotifyArtist = {
    artists: {
        href: string;
        items: SpotifyArtistItem[];
        limit: number;
        next: string;
        total: number;
    };
};

const getFollowedArtists = async (accessToken: string, limit: number = 20) => {
    const response = await spotify.get<SpotifyArtist>(`/me/following?type=artist&limit${limit}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
};

const useFollowedArtists = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);
    const invalidateSpotifyTokens = useInvalidateSpotifyTokens();

    const followedArtistsQuery = useQuery(['followed-artists', accessToken], () => getFollowedArtists(accessToken!), {
        enabled: !!accessToken,
        select: ({ artists }) => artists,
        onError: invalidateSpotifyTokens
    });

    return followedArtistsQuery;
};

export default useFollowedArtists;
