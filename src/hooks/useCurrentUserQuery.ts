import { useQuery } from 'react-query';
import useInvalidateSpotifyTokens from '~/hooks/useInvalidateSpotifyTokens';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify, SpotifyImage, SpotifyUser } from '~/utils/spotify';

export type SpotifyCurrentUserResponse = SpotifyUser & {
    email: string;
    followers: { href: string; total: number };
    images: SpotifyImage[];
};

const getCurrentUser = async (accessToken: string) => {
    const response = await spotify.get<SpotifyCurrentUserResponse>(`/me`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
};

const useCurrentUserQuery = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const invalidateSpotifyTokens = useInvalidateSpotifyTokens();

    const currentUserQuery = useQuery(['current-user', accessToken], () => getCurrentUser(accessToken!), {
        enabled: !!accessToken,
        onError: invalidateSpotifyTokens
    });

    return currentUserQuery;
};

export default useCurrentUserQuery;
