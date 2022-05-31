import { motion, Variants } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { FaSpotify } from 'react-icons/fa';
import { signInToSpotify } from '~/pages/api/signin';

const requestSpotifyAuthorization = () => {
    const clientID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectURI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scope = 'user-read-private user-read-email';

    if (!clientID || !redirectURI) return console.error('missing spotify client id or redirect uri');

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=code`;
};

const pulseVariants: Variants = {
    initial: { opacity: 0.6, scale: 1 },
    pulse: {
        opacity: [0.6, 0.6, 0.6, 0.6, 0],
        scale: [1, 1, 1, 1, 1.5],
        transition: { duration: 3, repeat: Infinity }
    }
};

const SignIn: NextPage = () => (
    <>
        <Head>
            <title>my-spotify | SignIn</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='grid h-screen place-items-center bg-zinc-900 text-white'>
            <div className='mx-2 flex flex-col items-center gap-4 rounded-md border-[1px] border-zinc-700 bg-zinc-800 px-4 py-6'>
                <div className='relative'>
                    <motion.div
                        variants={pulseVariants}
                        initial='initial'
                        animate='pulse'
                        className='absolute inset-0 rounded-full bg-green-500'
                    />
                    <FaSpotify className='relative rounded-full bg-zinc-800 text-6xl text-green-500 shadow-[inset_0_0_0_5px] shadow-green-500' />
                </div>

                <h1 className='text-center text-2xl'>
                    Welcome to <span className='text-green-500'>my-spotify</span>
                </h1>

                <button
                    onClick={requestSpotifyAuthorization}
                    className='mt-1 rounded-md bg-green-500 px-4 py-2 font-medium transition active:scale-95'
                >
                    Sign in with Spotify
                </button>
            </div>
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
