import { MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient, UseQueryResult } from 'react-query';
import { roundTo2d } from '~/components/organisms/PlayerSlider/utils';
import { SpotifyPlaybackState } from '~/hooks/usePlaybackState';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify } from '~/utils/spotify';

const seekToPosition = async (accessToken: string, position_ms: number) => {
    const response = await spotify.put<void>(
        `/me/player/seek?position_ms=${position_ms}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
};

export const useSetPlayerPosition = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const queryClient = useQueryClient();

    const setPlayerPosition = useMutation(
        (progress_ms: number) => {
            if (!accessToken) return Promise.reject(new Error('User is not signed in'));
            return seekToPosition(accessToken, progress_ms);
        },
        {
            mutationKey: ['spotify', 'playback-position'],
            onSuccess: () => queryClient.invalidateQueries(['spotify', 'playback-state'])
        }
    );

    return setPlayerPosition;
};

export const usePlaybackProgress = (playbackState: UseQueryResult<SpotifyPlaybackState, unknown>) => {
    const [progress, setProgress] = useState(0);
    const duration = roundTo2d(playbackState.data ? playbackState.data.item.duration_ms / (1000 * 60) : 0);
    const passedTime = roundTo2d(
        playbackState.data && progress > 0 ? ((progress / 100) * playbackState.data.item.duration_ms) / (1000 * 60) : 0
    );

    useEffect(() => {
        if (!playbackState.data) return;
        setProgress((playbackState.data.progress_ms / playbackState.data.item.duration_ms) * 100);
    }, [playbackState.data]);

    useEffect(() => {
        if (!playbackState.data || !playbackState.data.is_playing) return;

        if (progress >= 100) {
            playbackState.refetch();
            return;
        }

        const timing = 1000;
        const offset = (timing / playbackState.data.item.duration_ms) * 100;

        const timer = setTimeout(() => setProgress(currentProgress => currentProgress + offset), timing);
        return () => clearTimeout(timer);
    }, [playbackState, progress]);

    return { progress, setProgress, duration, passedTime };
};

export const useSyncHandleWithProgress = (
    handleX: MotionValue<number>,
    progress: number,
    progressBar: React.RefObject<HTMLDivElement>
) => {
    useEffect(() => {
        if (!progressBar.current) return;

        const newProgress = progress / 100;
        const progressBarBounds = progressBar.current.getBoundingClientRect();

        handleX.set(newProgress * progressBarBounds.width);
    }, [handleX, progress, progressBar]);
};