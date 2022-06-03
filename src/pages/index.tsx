import { NextPage } from 'next';
import Head from 'next/head';
import NavigationBar from '~/components/molecules/NavigationBar';
import FeaturedPlaylistsSection from '~/components/organisms/FeaturedPlaylistsSection';

const Home: NextPage = () => (
    <>
        <Head>
            <title>my-spotify | Home</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='grid h-screen grid-cols-1 grid-rows-[1fr_auto] overflow-hidden bg-zinc-900 text-white'>
            <div className='p-2'>
                <FeaturedPlaylistsSection />
            </div>
            <NavigationBar />
        </main>
    </>
);

export default Home;
