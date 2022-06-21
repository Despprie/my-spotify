import { useQuery } from 'react-query';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify, SpotifyArtist, SpotifyTrack } from '~/utils/spotify';

export type SpotifyUserTopItemsResponse<T> = {
    href: string;
    items: T extends 'artists' ? SpotifyArtist[] : SpotifyTrack[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
};

const getUserTopItems = async <T extends 'artists' | 'tracks'>(
    accessToken: string,
    type: T,
    limit: number = 20,
    offset: number = 0
) => {
    const response = await spotify.get<SpotifyUserTopItemsResponse<T>>(
        `/me/top/${type}?limit=${limit}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

const useUserTopItems = <T extends 'artists' | 'tracks'>(type: T) => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const userTopItemsQuery = useQuery(
        ['spotify', 'top-items', type, accessToken],
        () => getUserTopItems(accessToken!, type),
        { enabled: !!accessToken }
    );

    return userTopItemsQuery;
};

export default useUserTopItems;
