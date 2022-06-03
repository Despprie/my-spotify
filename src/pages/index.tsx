import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import NavigationBar from '~/components/molecules/NavigationBar';
import useFeaturedPlaylists from '~/hooks/useFeaturedPlaylists';

const Home: NextPage = () => {
    const featuredPlayListsQuery = useFeaturedPlaylists();

    useEffect(() => {
        console.log('data', featuredPlayListsQuery.data);
    }, [featuredPlayListsQuery.data]);

    return (
        <>
            <Head>
                <title>my-spotify | Home</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className='grid h-screen grid-cols-1 grid-rows-[1fr_auto] bg-zinc-900 text-white'>
                <h1>Hello, World!</h1>
                <NavigationBar />
            </main>
        </>
    );
};

export default Home;
