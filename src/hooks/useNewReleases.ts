import { useQuery } from 'react-query';
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

const getNewReleases = async (accessToken: string, limit: number, offset: number) => {
    const response = await spotify.get<SpotifyNewReleasesResponse>(
        `/browse/new-releases?limit=${limit}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

const useNewReleases = (limit: number = 20, offset: number = 0) => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const newReleasesQuery = useQuery(
        ['spotify', 'new-releases', limit, offset, accessToken],
        () => getNewReleases(accessToken!, limit, offset),
        {
            enabled: !!accessToken,
            select: ({ albums }) => albums
        }
    );

    return newReleasesQuery;
};

export default useNewReleases;
