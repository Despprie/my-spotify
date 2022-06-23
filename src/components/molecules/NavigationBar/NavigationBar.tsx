import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Icon from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';

const NavigationBar = () => {
    const router = useRouter();
    const activeScreen = useMemo(() => router.pathname.split('/')[1], [router.pathname]);

    return (
        <nav className='flex items-center justify-around border-t-[1px] border-zinc-700 bg-zinc-800 py-2 text-green-500 lg:relative lg:col-[1/span_1] lg:row-[1/span_1] lg:w-72 lg:flex-col lg:items-start lg:justify-start lg:gap-5 lg:border-t-0 lg:border-r-[1px] lg:border-zinc-800 lg:bg-zinc-900 lg:py-7 lg:pl-14'>
            <div className='mb-10 hidden items-center gap-10 lg:flex'>
                <Icon theme='spotify' className='text-2xl' />
                <Typography title='my-spotify' className='text-lg font-semibold text-white' />
            </div>

            <Link href='/'>
                <a className='group flex flex-col items-center lg:flex-row lg:gap-10'>
                    <Icon
                        theme='home'
                        className={`text-2xl group-hover:lg:text-green-500 ${
                            activeScreen ? 'text-gray-500 lg:text-white' : ''
                        }`}
                    />
                    <Typography
                        title='Home'
                        className={`text-sm lg:text-base group-hover:lg:text-green-500 ${
                            activeScreen ? 'text-gray-500 lg:text-white' : ''
                        }`}
                    />

                    {!activeScreen && (
                        <motion.div
                            layoutId='nav-active-screen'
                            className='absolute right-0 hidden h-8 w-2 rounded-[0.375rem_0_0_0.375rem] bg-green-500 lg:block'
                        />
                    )}
                </a>
            </Link>

            <Link href='/search'>
                <a className='group flex flex-col items-center lg:flex-row lg:gap-10'>
                    <Icon
                        theme='search'
                        className={`text-2xl group-hover:lg:text-green-500 ${
                            activeScreen !== 'search' ? 'text-gray-500 lg:text-white' : ''
                        }`}
                    />
                    <Typography
                        title='Search'
                        className={`text-sm lg:text-base group-hover:lg:text-green-500 ${
                            activeScreen !== 'search' ? 'text-gray-500 lg:text-white' : ''
                        }`}
                    />

                    {activeScreen === 'search' && (
                        <motion.div
                            layoutId='nav-active-screen'
                            className='absolute right-0 hidden h-8 w-2 rounded-[0.375rem_0_0_0.375rem] bg-green-500 lg:block'
                        />
                    )}
                </a>
            </Link>

            <Link href='/library'>
                <a className='group flex flex-col items-center lg:flex-row lg:gap-10'>
                    <Icon
                        theme='library'
                        className={`text-2xl group-hover:lg:text-green-500 ${
                            activeScreen !== 'library' ? 'text-gray-500 lg:text-white' : ''
                        }`}
                    />
                    <Typography
                        title='Library'
                        className={`text-sm lg:text-base group-hover:lg:text-green-500 ${
                            activeScreen !== 'library' ? 'text-gray-500 lg:text-white' : ''
                        }`}
                    />

                    {activeScreen === 'library' && (
                        <motion.div
                            layoutId='nav-active-screen'
                            className='absolute right-0 hidden h-8 w-2 rounded-[0.375rem_0_0_0.375rem] bg-green-500 lg:block'
                        />
                    )}
                </a>
            </Link>
        </nav>
    );
};

export default NavigationBar;
