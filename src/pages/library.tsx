import { NextPage } from 'next';
import Head from 'next/head';
import NavigationBar from '~/components/molecules/NavigationBar';

const Library: NextPage = () => (
    <>
        <Head>
            <title>my-spotify | Your Library</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='grid h-screen grid-cols-1 grid-rows-[1fr_auto] bg-zinc-900 text-white'>
            <h1>Hello, World!</h1>
            <NavigationBar />
        </main>
    </>
);

export default Library;
