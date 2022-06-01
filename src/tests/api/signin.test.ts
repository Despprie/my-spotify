import axios, { AxiosError, AxiosResponse } from 'axios';
import { NextApiRequest } from 'next';
import querystring from 'query-string';
import signin, { SpotifyTokens } from '~/pages/api/signin';

const fakeSpotifyTokens: SpotifyTokens = {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expires_in: 3600,
    scope: 'user-read-private user-read-email',
    token_type: 'Bearer'
};

axios.post = jest.fn().mockResolvedValue({ data: fakeSpotifyTokens });

describe('signin', () => {
    const json = jest.fn();
    const end = jest.fn();
    const status = jest.fn(() => ({ json, end }));

    const req = { method: 'POST', body: { code: 'code' } };
    const res = { json, end, status };

    beforeEach(() => {
        jest.clearAllMocks();

        process.env = {
            ...process.env,
            SPOTIFY_CLIENT_SECRET: 'client_secret',
            NEXT_PUBLIC_SPOTIFY_CLIENT_ID: 'client_id',
            NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: 'redirect_uri'
        };
    });

    it('should return with status 405', async () => {
        await signin({ ...req, method: 'GET' } as NextApiRequest, res as any);
        expect(res.status).toHaveBeenCalledWith(405);
        expect(res.end).toHaveBeenCalled();
    });

    it('should return with status 400', async () => {
        await signin({ ...req, body: {} } as NextApiRequest, res as any);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalled();
    });

    it('should return with status 500', async () => {
        process.env = {
            ...process.env,
            SPOTIFY_CLIENT_SECRET: undefined,
            NEXT_PUBLIC_SPOTIFY_CLIENT_ID: undefined,
            NEXT_PUBLIC_SPOTIFY_REDIRECT_URI: undefined
        };

        await signin(req as NextApiRequest, res as any);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.end).toHaveBeenCalled();
    });

    it('should return with status 200', async () => {
        await signin({ ...req, body: { code: 'code' } } as NextApiRequest, res as any);

        expect(axios.post).toHaveBeenCalledWith(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'authorization_code',
                redirect_uri: 'redirect_uri',
                code: 'code'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(`client_id:client_secret`).toString('base64')}`
                }
            }
        );

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeSpotifyTokens);
    });

    it('should return with status 400 and axios error', async () => {
        axios.post = jest
            .fn()
            .mockRejectedValue(new AxiosError('Oops', '', {}, {}, { status: 400 } as AxiosResponse<unknown, any>));

        await signin({ ...req, body: { code: 'code' } } as NextApiRequest, res as any);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalled();
    });

    it('should return with status 500 and no axios error', async () => {
        axios.post = jest.fn().mockRejectedValue(new Error('Oops'));

        await signin({ ...req, body: { code: 'code' } } as NextApiRequest, res as any);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.end).toHaveBeenCalled();
    });
});
