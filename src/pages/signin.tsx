import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { signInToSpotify } from '~/pages/api/signin';

const requestSpotifyAuthorization = () => {
    const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectURI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scope = 'user-read-private user-read-email';

    if (!clientID || !redirectURI) return console.error('missing spotify client id or redirect uri');

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=code`;
};

const SignIn: NextPage = () => (
    <>
        <Head>
            <title>my-spotify | SignIn</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='grid h-screen place-items-center bg-zinc-900 text-white'>
            <button onClick={requestSpotifyAuthorization}>Sign in to Spotify</button>
        </main>
    </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.code) return { props: {} };

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) return { props: {} };

    try {
        const code = Array.isArray(query.code) ? query.code[0] : query.code;
        const tokens = await signInToSpotify(code, clientId, clientSecret, redirectUri);

        return {
            props: { tokens },
            redirect: {
                permanent: false,
                destination: '/'
            }
        };
    } catch {
        return { props: {} };
    }
};

export default SignIn;
