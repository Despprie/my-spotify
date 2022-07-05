import { UseQueryResult } from 'react-query';
import Icon from '~/components/atoms/Icon';
import { SpotifyPlaybackState } from '~/hooks/usePlaybackState';

type PlayerActionsProps = { playbackState: UseQueryResult<SpotifyPlaybackState, unknown> };

const PlayerActions = ({ playbackState }: PlayerActionsProps) => (
    <div className='flex items-center justify-around'>
        <button>
            <Icon theme='shuffle' className={`text-2xl ${playbackState.data?.shuffle_state ? 'text-green-500' : ''}`} />
        </button>
        <button className='rotate-180'>
            <Icon theme='forward' className='text-3xl' />
        </button>
        <button className='rounded-full bg-green-500 p-2 transition hover:bg-green-500/90 active:scale-95'>
            <Icon theme={playbackState.data?.is_playing ? 'pause' : 'play'} className='text-4xl' />
        </button>
        <button>
            <Icon theme='forward' className='text-3xl' />
        </button>
        <button>
            <Icon
                theme={playbackState.data?.repeat_state !== 'track' ? 'repeat' : 'repeat1'}
                className={`text-2xl ${
                    playbackState.isSuccess && playbackState.data.repeat_state !== 'off' ? 'text-green-500' : ''
                }`}
            />
        </button>
    </div>
);

export default PlayerActions;
