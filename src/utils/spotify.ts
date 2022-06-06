import axios from 'axios';

const spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: { 'Content-Type': 'application/json' }
});

export type SpotifyUser = {
    id: string;
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    type: string;
    uri: string;
};

export type SpotifyImage = {
    url: string;
    width: number;
    height: number;
};

export default spotify;
