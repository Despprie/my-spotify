import { useQuery } from 'react-query';
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

const useCurrentUser = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const currentUserQuery = useQuery(['spotify', 'current-user', accessToken], () => getCurrentUser(accessToken!), {
        enabled: !!accessToken
    });

    return currentUserQuery;
};

export default useCurrentUser;
