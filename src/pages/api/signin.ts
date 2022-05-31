import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'query-string';

export type SpotifyTokens = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
};

export const signInToSpotify = async (code: string, clientId: string, clientSecret: string, redirectUri: string) => {
    const response = await axios.post<SpotifyTokens>(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            code
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            }
        }
    );

    return response.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SpotifyTokens | void>) {
    if (req.method !== 'POST') return res.status(405).end();

    const { code } = req.body as Partial<{ code: string }>;
    if (!code) return res.status(400).end();

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) return res.status(500).end();

    try {
        const tokens = await signInToSpotify(code, clientId, clientSecret, redirectUri);
        return res.status(200).json(tokens);
    } catch (error) {
        return res.status(axios.isAxiosError(error) && error.response ? error.response.status : 500).end();
    }
}
