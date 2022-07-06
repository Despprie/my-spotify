import { useMutation, useQueryClient } from 'react-query';
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

    const resumePlayback = useMutation(
        () => {
            if (!accessToken) return Promise.reject(new Error('User is not signed in'));
            return startOrResumePlayback(accessToken);
        },
        {
            mutationKey: ['spotify', 'resume-playback'],
            onSuccess: () => queryClient.invalidateQueries(['spotify', 'playback-state'])
        }
    );

    return resumePlayback;
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

    const _pausePlayback = useMutation(
        () => {
            if (!accessToken) return Promise.reject(new Error('User is not signed in'));
            return pausePlayback(accessToken);
        },
        {
            mutationKey: ['spotify', 'pause-playback'],
            onSuccess: () => queryClient.invalidateQueries(['spotify', 'playback-state'])
        }
    );

    return _pausePlayback;
};
