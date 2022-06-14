import axios from 'axios';

export const spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: { 'Content-Type': 'application/json' }
});

export type SpotifyUser = {
    id: string;
    display_name: string;
    href: string;
    type: string;
    uri: string;
};

export type SpotifyImage = {
    url: string;
    width: number;
    height: number;
};

export type SpotifyPlaylist = {
    id: string;
    name: string;
    description: string;
    public: boolean;
    collaborative: boolean;
    images: SpotifyImage[];
    tracks: { href: string };
    owner: SpotifyUser;
    uri: string;
    href: string;
    type: string;
};

export type SpotifyArtist = {
    id: string;
    name: string;
    images: SpotifyImage[];
    followers: { href: string; total: number };
    genres: string[];
    popularity: number;
    href: string;
    uri: string;
    type: string;
};
