import create from 'zustand';
import { persist } from 'zustand/middleware';
import { SpotifyTokens } from '~/pages/api/signin';

export type StoreType = {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    expiresIn: number | undefined;
    scope: string | undefined;
    tokenType: string | undefined;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    setExpiresIn: (expiresIn: number) => void;
    setScope: (scope: string) => void;
    setTokenType: (tokenType: string) => void;
    setStore: (store: SpotifyTokens) => void;
    refreshStore: (store: Omit<SpotifyTokens, 'refresh_token'>) => void;
};

const useSpotifyTokensStore = create(
    persist<StoreType>(
        set => ({
            accessToken: undefined,
            refreshToken: undefined,
            expiresIn: undefined,
            scope: undefined,
            tokenType: undefined,
            setAccessToken: (accessToken: string) => set({ accessToken }),
            setRefreshToken: (refreshToken: string) => set({ refreshToken }),
            setExpiresIn: (expiresIn: number) => set({ expiresIn }),
            setScope: (scope: string) => set({ scope }),
            setTokenType: (tokenType: string) => set({ tokenType }),
            setStore: ({ access_token, refresh_token, expires_in, scope, token_type }: SpotifyTokens) =>
                set({
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    expiresIn: expires_in,
                    scope,
                    tokenType: token_type
                }),
            refreshStore: ({ access_token, expires_in, scope, token_type }: Omit<SpotifyTokens, 'refresh_token'>) =>
                set({
                    accessToken: access_token,
                    expiresIn: expires_in,
                    scope,
                    tokenType: token_type
                })
        }),
        { name: 'my-spotify-tokens' }
    )
);

export default useSpotifyTokensStore;
