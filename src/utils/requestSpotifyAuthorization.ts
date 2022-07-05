const requestSpotifyAuthorization = () => {
    const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectURI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scope = 'user-read-private user-read-email user-read-playback-state user-modify-playback-state';

    if (!clientID || !redirectURI) return console.error('missing spotify client id or redirect uri');

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=code`;
};

export default requestSpotifyAuthorization;
