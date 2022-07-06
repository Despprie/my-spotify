import { useMutation, useQueryClient } from 'react-query';
import { SpotifyPlaybackState } from '~/hooks/usePlaybackState';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify } from '~/utils/spotify';

const startOrResumePlayback = async (accessToken: string) => {
    const response = await spotify.put<void>(
        '/me/player/play',
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

export const useResumePlayback = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const queryClient = useQueryClient();

    const resume = useMutation(
        () => {
            if (!accessToken) return Promise.reject(new Error('User is not signed in'));
            return startOrResumePlayback(accessToken);
        },
        {
            mutationKey: ['spotify', 'resume-playback'],
            onSuccess: () => queryClient.invalidateQueries(['spotify', 'playback-state'])
        }
    );

    return resume;
};

const pausePlayback = async (accessToken: string) => {
    const response = await spotify.put<void>(
        '/me/player/pause',
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

export const usePausePlayback = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const queryClient = useQueryClient();

    const pause = useMutation(
        () => {
            if (!accessToken) return Promise.reject(new Error('User is not signed in'));
            return pausePlayback(accessToken);
        },
        {
            mutationKey: ['spotify', 'pause-playback'],
            onSuccess: () => queryClient.invalidateQueries(['spotify', 'playback-state'])
        }
    );

    return pause;
};

const skipToNextPlayback = async (accessToken: string) => {
    const response = await spotify.post<void>(
        '/me/player/next',
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

export const useSkipToNextPlayback = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const queryClient = useQueryClient();

    const skipToNext = useMutation(
        () => {
            if (!accessToken) return Promise.reject(new Error('User is not signed in'));
            return skipToNextPlayback(accessToken);
        },
        {
            mutationKey: ['spotify', 'skip-next-playback'],
            onSuccess: () => queryClient.invalidateQueries(['spotify', 'playback-state'])
        }
    );

    return skipToNext;
};

const skipToPreviousPlayback = async (accessToken: string) => {
    const response = await spotify.post<void>(
        '/me/player/previous',
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

export const useSkipToPreviousPlayback = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const queryClient = useQueryClient();

    const skipToPrevious = useMutation(
        () => {
            if (!accessToken) return Promise.reject(new Error('User is not signed in'));
            return skipToPreviousPlayback(accessToken);
        },
        {
            mutationKey: ['spotify', 'skip-previous-playback'],
            onSuccess: () => queryClient.invalidateQueries(['spotify', 'playback-state'])
        }
    );

    return skipToPrevious;
};

const togglePlaybackShuffle = async (accessToken: string, state: boolean) => {
    const response = await spotify.put<void>(
        `/me/player/shuffle?state=${state}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

export const useTogglePlaybackShuffle = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const queryClient = useQueryClient();

    const toggleShuffle = useMutation(
        (state: boolean) => {
            if (!accessToken) return Promise.reject(new Error('User is not signed in'));
            return togglePlaybackShuffle(accessToken, state);
        },
        {
            mutationKey: ['spotify', 'playback-shuffle'],
            onSuccess: () => queryClient.invalidateQueries(['spotify', 'playback-state'])
        }
    );

    return toggleShuffle;
};

const setPlaybackRepeat = async (accessToken: string, state: SpotifyPlaybackState['repeat_state']) => {
    const response = await spotify.put<void>(
        `/me/player/repeat?state=${state}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

export const useSetPlaybackRepeat = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const queryClient = useQueryClient();

    const setRepeat = useMutation(
        (state: SpotifyPlaybackState['repeat_state']) => {
            if (!accessToken) return Promise.reject(new Error('User is not signed in'));
            return setPlaybackRepeat(accessToken, state);
        },
        {
            mutationKey: ['spotify', 'playback-shuffle'],
            onSuccess: () => queryClient.invalidateQueries(['spotify', 'playback-state'])
        }
    );

    return setRepeat;
};
