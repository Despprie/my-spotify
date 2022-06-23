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

const getFollowedArtists = async (accessToken: string, limit: number) => {
    const response = await spotify.get<SpotifyArtistResponse>(`/me/following?type=artist&limit=${limit}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
};

const useFollowedArtists = (limit: number = 20) => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const followedArtistsQuery = useQuery(
        ['spotify', 'followed-artists', limit, accessToken],
        () => getFollowedArtists(accessToken!, limit),
        {
            enabled: !!accessToken,
            select: ({ artists }) => artists
        }
    );

    return followedArtistsQuery;
};

export default useFollowedArtists;
