import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useEmitter, useListener } from '~/hooks/useEventEmitter';
import { SpotifyTokens } from '~/pages/api/signin';
import useSpotifyTokensStore from '~/pages/store/SpotifyTokens';

const refreshAccessToken = async (refresh_token: string) => {
    const response = await axios.post<Omit<SpotifyTokens, 'refresh_token'>>('/api/refresh', { refresh_token });
    return response.data;
};

export const useSpotifyTokensStoreSetUp = (spotifyTokens: SpotifyTokens | undefined) => {
    const setStore = useSpotifyTokensStore(store => store.setStore);
    useEffect(() => (spotifyTokens ? setStore(spotifyTokens) : undefined), [setStore, spotifyTokens]);
};

export const useRefreshSpotifyTokens = () => {
    const router = useRouter();
    const refreshStore = useSpotifyTokensStore(store => store.refreshStore);

    const onSpotifyTokensRefresh = useCallback(
        (refreshToken: string) => {
            refreshAccessToken(refreshToken)
                .then(tokens => refreshStore(tokens))
                .catch(() => router.push('/signin'));
        },
        [refreshStore, router]
    );

    useListener('refresh-spotify-tokens', onSpotifyTokensRefresh);
};

export const useWatchSpotifyTokensExpiration = () => {
    const refreshSpotifyTokensEmitter = useEmitter('refresh-spotify-tokens');

    const { refreshToken, expiresIn } = useSpotifyTokensStore(
        store => ({ refreshToken: store.refreshToken, expiresIn: store.expiresIn }),
        shallow
    );

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        const timer = setInterval(() => refreshSpotifyTokensEmitter(refreshToken), expiresIn * 1000);
        return () => clearInterval(timer);
    }, [refreshSpotifyTokensEmitter, refreshToken, expiresIn]);
};
