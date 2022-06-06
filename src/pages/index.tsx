import { NextPage } from 'next';
import Head from 'next/head';
import Typography from '~/components/atoms/Typography';
import NavigationBar from '~/components/molecules/NavigationBar';
import FeaturedPlaylistsSection from '~/components/organisms/FeaturedPlaylistsSection';

const Home: NextPage = () => (
    <>
        <Head>
            <title>my-spotify | Home</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='grid h-screen grid-cols-1 grid-rows-[1fr_auto] overflow-hidden bg-zinc-900 text-white'>
            <div className='py-2'>
                <div className='mb-5 px-2'>
                    <Typography theme='title' title='Welcome back!' className='font-semibold' />
                    <Typography title="Let's listen to something cool today" className='text-sm text-gray-500' />
                </div>

                <FeaturedPlaylistsSection />

                {/* ... */}
            </div>
            <NavigationBar />
        </main>
    </>
);

export default Home;
