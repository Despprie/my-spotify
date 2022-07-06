import { UseQueryResult } from 'react-query';
import Icon from '~/components/atoms/Icon';
import {
    usePausePlayback,
    useResumePlayback,
    useSetPlaybackRepeat,
    useSkipToNextPlayback,
    useSkipToPreviousPlayback,
    useTogglePlaybackShuffle
} from '~/components/molecules/PlayerActions/hooks';
import { SpotifyPlaybackState } from '~/hooks/usePlaybackState';

type PlayerActionsProps = { playbackState: UseQueryResult<SpotifyPlaybackState, unknown> };

const PlayerActions = ({ playbackState }: PlayerActionsProps) => {
    const resume = useResumePlayback();
    const pause = usePausePlayback();

    const skipToNext = useSkipToNextPlayback();
    const skipToPrevious = useSkipToPreviousPlayback();

    const toggleShuffle = useTogglePlaybackShuffle();
    const setRepeat = useSetPlaybackRepeat();

    const onPlayButtonClick = () => {
        if (!playbackState.isSuccess) return;

        if (playbackState.data.is_playing) pause.mutate();
        else resume.mutate();
    };

    const onRepeatButtonClick = () => {
        if (!playbackState.isSuccess) return;

        setRepeat.mutate(
            playbackState.data.repeat_state === 'off'
                ? 'context'
                : playbackState.data.repeat_state === 'context'
                ? 'track'
                : 'off'
        );
    };

    return (
        <div className='flex items-center justify-around'>
            <button
                onClick={() => playbackState.data && toggleShuffle.mutate(!playbackState.data.shuffle_state)}
                className='rounded-full bg-green-500/0 p-2 transition duration-500 active:bg-green-500/10'
            >
                <Icon
                    theme='shuffle'
                    className={`text-2xl ${playbackState.data?.shuffle_state ? 'text-green-500' : ''}`}
                />
            </button>
            <button
                onClick={() => skipToPrevious.mutate()}
                className='rotate-180 rounded-full bg-green-500/0 p-1 transition duration-500 active:bg-green-500/10'
            >
                <Icon theme='forward' className='text-3xl' />
            </button>
            <button
                onClick={onPlayButtonClick}
                className='mx-1 rounded-full bg-green-500 p-2 transition hover:bg-green-500/90 active:scale-95'
            >
                <Icon theme={playbackState.data?.is_playing ? 'pause' : 'play'} className='text-4xl' />
            </button>
            <button
                onClick={() => skipToNext.mutate()}
                className='rounded-full bg-green-500/0 p-1 transition duration-500 active:bg-green-500/10'
            >
                <Icon theme='forward' className='text-3xl' />
            </button>
            <button
                onClick={onRepeatButtonClick}
                className='rounded-full bg-green-500/0 p-2 transition duration-500 active:bg-green-500/10'
            >
                <Icon
                    theme={playbackState.data?.repeat_state !== 'track' ? 'repeat' : 'repeat1'}
                    className={`text-2xl ${
                        playbackState.isSuccess && playbackState.data.repeat_state !== 'off' ? 'text-green-500' : ''
                    }`}
                />
            </button>
        </div>
    );
};

export default PlayerActions;
