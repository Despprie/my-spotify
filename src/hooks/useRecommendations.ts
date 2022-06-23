import _ from 'lodash';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import useUserTopItems from '~/hooks/useUserTopItems';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify, SpotifyTrack } from '~/utils/spotify';

type SpotifyGenreSeedsResponse = { genres: string[] };

const getGenreSeeds = async (accessToken: string) => {
    const response = await spotify.get<SpotifyGenreSeedsResponse>('/recommendations/available-genre-seeds', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
};

export type SpotifyRecommendationResponse = {
    seeds: {
        initialPoolSize: number;
        afterFilteringSize: number;
        afterRelinkingSize: number;
        href: string;
        id: string;
        type: string;
    }[];
    tracks: SpotifyTrack[];
};

const getRecommendations = async (accessToken: string, artistsSeeds: string, tracksSeeds: string, limit: number) => {
    // spotify recommendations api endpoint requires a maximum of 5 seeds
    // we use 1 genre from the generated genre seeds
    const genresSeed = _.shuffle((await getGenreSeeds(accessToken)).genres)[0];

    const response = await spotify.get<SpotifyRecommendationResponse>(
        `/recommendations?seed_artists=${artistsSeeds}&seed_genres=${genresSeed}&seed_tracks=${tracksSeeds}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

const getRandomSeeds = <T extends { id: string }>(seed: T[], limit: number) =>
    _.shuffle(seed)
        .slice(0, limit)
        .map(item => item.id)
        .join(',');

const useRecommendations = (limit: number = 20) => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const userTopArtistsQuery = useUserTopItems('artists');
    const userTopTracksQuery = useUserTopItems('tracks');

    // spotify recommendations api endpoint requires a maximum of 5 seeds
    // we use 2 artists from the user's top artists
    const artistsSeeds = useMemo(
        () => userTopArtistsQuery.data && getRandomSeeds(userTopArtistsQuery.data.items, 2),
        [userTopArtistsQuery.data]
    );

    // spotify recommendations api endpoint requires a maximum of 5 seeds
    // we use 2 tracks from the user's top tracks
    const tracksSeeds = useMemo(
        () => userTopTracksQuery.data && getRandomSeeds(userTopTracksQuery.data.items, 2),
        [userTopTracksQuery.data]
    );

    const recommendationQuery = useQuery(
        ['spotify', 'recommendation', artistsSeeds, tracksSeeds, limit, accessToken],
        () => getRecommendations(accessToken!, artistsSeeds!, tracksSeeds!, limit),
        {
            enabled: !!(accessToken && artistsSeeds && tracksSeeds),
            select: ({ tracks }) => tracks,
            staleTime: 1000 * 60 * 5
        }
    );

    return recommendationQuery;
};

export default useRecommendations;
