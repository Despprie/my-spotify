import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'query-string';
import { SpotifyTokens } from './signin';

export const refreshSpotifyTokens = async (clientId: string, clientSecret: string, refreshToken: string) => {
    const response = await axios.post<Omit<SpotifyTokens, 'refresh_token'>>(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Omit<SpotifyTokens, 'refresh_token'> | void>
) {
    if (req.method !== 'POST') return res.status(405).end();

    const { refresh_token } = req.body as Partial<{ refresh_token: string }>;
    if (!refresh_token) return res.status(400).end();

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) return res.status(500).end();

    try {
        const tokens = await refreshSpotifyTokens(clientId, clientSecret, refresh_token);
        return res.status(200).json(tokens);
    } catch (error) {
        return res.status(axios.isAxiosError(error) && error.response ? error.response.status : 500).end();
    }
}
