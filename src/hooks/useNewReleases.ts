import { useQuery } from 'react-query';
import useInvalidateSpotifyTokens from '~/hooks/useInvalidateSpotifyTokens';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify, SpotifyAlbum } from '~/utils/spotify';

export type SpotifyNewReleasesResponse = {
    albums: {
        href: string;
        items: SpotifyAlbum[];
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
    };
};

const getNewReleases = async (accessToken: string, limit: number = 20, offset: number = 0) => {
    const response = await spotify.get<SpotifyNewReleasesResponse>(
        `/browse/new-releases?limit=${limit}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

const useNewReleases = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);
    const invalidateSpotifyTokens = useInvalidateSpotifyTokens();

    const featuredPlayListsQuery = useQuery(['new-releases', accessToken], () => getNewReleases(accessToken!), {
        enabled: !!accessToken,
        select: ({ albums }) => albums,
        onError: invalidateSpotifyTokens
    });

    return featuredPlayListsQuery;
};

export default useNewReleases;
