import { useQuery } from 'react-query';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify, SpotifyArtist } from '~/utils/spotify';

export type SpotifyArtistResponse = {
    artists: {
        href: string;
        items: SpotifyArtist[];
        limit: number;
        next: string;
        total: number;
    };
};

const getFollowedArtists = async (accessToken: string, limit: number = 20) => {
    const response = await spotify.get<SpotifyArtistResponse>(`/me/following?type=artist&limit=${limit}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
};

const useFollowedArtists = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const followedArtistsQuery = useQuery(
        ['spotify', 'followed-artists', accessToken],
        () => getFollowedArtists(accessToken!),
        {
            enabled: !!accessToken,
            select: ({ artists }) => artists
        }
    );

    return followedArtistsQuery;
};

export default useFollowedArtists;
