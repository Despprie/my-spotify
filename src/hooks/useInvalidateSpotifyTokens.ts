import axios from 'axios';
import { useCallback } from 'react';
import { useEmitter } from '~/hooks/useEventEmitter';
import useSpotifyTokensStore from '~/store/SpotifyTokens';

const useInvalidateSpotifyTokens = () => {
    const refreshToken = useSpotifyTokensStore(store => store.refreshToken);
    const refreshSpotifyTokensEmitter = useEmitter('refresh-spotify-tokens');

    const invalidateSpotifyTokens = useCallback(
        (error: unknown) => {
            if (!axios.isAxiosError(error) || !refreshToken) return;
            if (error.response?.status === 401) refreshSpotifyTokensEmitter(refreshToken);
        },
        [refreshSpotifyTokensEmitter, refreshToken]
    );

    return invalidateSpotifyTokens;
};

export default useInvalidateSpotifyTokens;
