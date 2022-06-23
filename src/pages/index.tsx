import { NextPage } from 'next';
import Head from 'next/head';
import HomeHeader from '~/components/organisms/HomeHeader';

const Home: NextPage = () => (
    <>
        <Head>
            <title>my-spotify | Home</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <HomeHeader />

        {/* <RecommendationsSection />
        <FollowedArtistsSection />
        <UserPlaylistsSection />
        <NewReleasesSection />
        <FeaturedPlaylistsSection /> */}
    </>
);

export default Home;
