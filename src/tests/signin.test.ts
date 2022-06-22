import * as Server from '~/pages/api/signin';
import { getServerSideProps } from '~/pages/signin';

const fakeSpotifyTokens: Server.SpotifyTokens = {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expires_in: 3600,
    scope: 'user-read-private user-read-email',
    token_type: 'Bearer'
};

const signInToSpotifySpy = jest
    .spyOn(Server, 'signInToSpotify')
    .mockImplementation((_code: string, _clientId: string, _clientSecret: string, _redirectUri: string) =>
        Promise.resolve(fakeSpotifyTokens)
    );

describe('SignIn', () => {
    beforeEach(() => {
        process.env = {
            ...process.env,
            SPOTIFY_CLIENT_SECRET: 'client_secret',
            NEXT_PUBLIC_SPOTIFY_CLIENT_ID: 'client_id',
            NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: 'redirect_uri'
        };
    });

    it('should return Spotify tokens as props when code is a string', async () => {
        const response = await getServerSideProps({ query: { code: 'code' } } as any);
        expect(response).toEqual(expect.objectContaining({ props: { spotifyTokens: fakeSpotifyTokens } }));
    });

    it('should return Spotify tokens as props when code is an array', async () => {
        const response = await getServerSideProps({ query: { code: ['code'] } } as any);
        expect(response).toEqual(expect.objectContaining({ props: { spotifyTokens: fakeSpotifyTokens } }));
    });

    it('should do nothing due to sign in failed', async () => {
        signInToSpotifySpy.mockRejectedValue(new Error('Oops'));

        const response = await getServerSideProps({ query: { code: 'code' } } as any);
        expect(response).toEqual(expect.objectContaining({ props: {} }));
    });

    it('should do nothing due to env variable being undefined', async () => {
        process.env = {
            ...process.env,
            SPOTIFY_CLIENT_SECRET: undefined,
            NEXT_PUBLIC_SPOTIFY_CLIENT_ID: undefined,
            NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: undefined
        };

        const response = await getServerSideProps({ query: { code: 'code' } } as any);
        expect(response).toEqual(expect.objectContaining({ props: {} }));
    });

    it('should do nothing due to query being empty', async () => {
        const response = await getServerSideProps({ query: {} } as any);
        expect(response).toEqual(expect.objectContaining({ props: {} }));
    });
});
