import type { AppProps } from 'next/app';
import { useRef } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import useInvalidateSpotifyTokens from '~/hooks/useInvalidateSpotifyTokens';
import {
    useRefreshSpotifyTokens,
    useSpotifyTokensStoreSetUp,
    useWatchSpotifyTokensExpiration
} from '~/hooks/useSpotifyTokens';
import '~/styles/globals.css';
import '~/styles/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = useRef(new QueryClient({ defaultOptions: { queries: { retry: false } } }));

    const invalidateSpotifyTokens = useInvalidateSpotifyTokens();
    queryClient.current.setQueryDefaults(['spotify'], { onError: invalidateSpotifyTokens });

    useSpotifyTokensStoreSetUp(pageProps.spotifyTokens);
    useRefreshSpotifyTokens();
    useWatchSpotifyTokensExpiration();

    return (
        <QueryClientProvider client={queryClient.current}>
            <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
