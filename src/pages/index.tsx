import { NextPage } from 'next';
import Head from 'next/head';
import NavigationBar from '~/components/molecules/NavigationBar';
import FeaturedPlaylistsSection from '~/components/organisms/FeaturedPlaylistsSection';
import FollowedArtistsSection from '~/components/organisms/FollowedArtistsSection';
import HomeHeader from '~/components/organisms/HomeHeader';
import NewReleasesSection from '~/components/organisms/NewReleasesSection';
import UserPlaylistsSection from '~/components/organisms/UserPlaylistsSection';

const Home: NextPage = () => (
    <>
        <Head>
            <title>my-spotify | Home</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='grid h-screen grid-cols-1 grid-rows-[1fr_auto] overflow-hidden bg-zinc-900 text-white'>
            <div className='flex flex-col gap-4 overflow-y-auto py-2'>
                <HomeHeader />

                <FollowedArtistsSection />
                <UserPlaylistsSection />
                <NewReleasesSection />
                <FeaturedPlaylistsSection />
            </div>

            <NavigationBar />
        </main>
    </>
);

export default Home;
