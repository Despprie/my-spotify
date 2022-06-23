import { NextPage } from 'next';
import Head from 'next/head';
import FeaturedPlaylistsSection from '~/components/organisms/FeaturedPlaylistsSection';
import FollowedArtistsSection from '~/components/organisms/FollowedArtistsSection';
import HomeHeader from '~/components/organisms/HomeHeader';
import NewReleasesSection from '~/components/organisms/NewReleasesSection';
import RecommendationsSection from '~/components/organisms/RecommendationsSection';
import UserPlaylistsSection from '~/components/organisms/UserPlaylistsSection';

const Home: NextPage = () => (
    <>
        <Head>
            <title>my-spotify | Home</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <HomeHeader />

        <RecommendationsSection />
        <FollowedArtistsSection />
        <UserPlaylistsSection />
        <NewReleasesSection />
        <FeaturedPlaylistsSection />
    </>
);

export default Home;
