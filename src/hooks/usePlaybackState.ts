import { useQuery } from 'react-query';
import useSpotifyTokensStore from '~/store/SpotifyTokens';
import { spotify, SpotifyDevice, SpotifyTrack } from '~/utils/spotify';

export type SpotifyPlaybackState = {
    is_playing: boolean;
    progress_ms: number;
    repeat_state: 'track' | 'context' | 'off';
    shuffle_state: boolean;
    timestamp: number;
    device: SpotifyDevice;
    item: SpotifyTrack;
};

const getPlaybackState = async (accessToken: string) => {
    const response = await spotify.get<SpotifyPlaybackState>('/me/player', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
};

const usePlaybackState = () => {
    const accessToken = useSpotifyTokensStore(store => store.accessToken);

    const playbackState = useQuery(['spotify', 'playback-state', accessToken], () => getPlaybackState(accessToken!), {
        enabled: !!accessToken
    });

    return playbackState;
};

export default usePlaybackState;
