import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Icon from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';

const NavigationBar = () => {
    const router = useRouter();
    const activeScreen = useMemo(() => router.pathname.split('/')[1], [router.pathname]);

    return (
        <nav className='flex items-center justify-around border-t-[1px] border-zinc-700 bg-zinc-800 py-2'>
            <Link href='/'>
                <button className='flex flex-col items-center'>
                    <Icon theme='home' className={`text-2xl ${activeScreen ? 'text-gray-500' : ''}`} />
                    <Typography title='Home' className={`text-sm ${activeScreen ? 'text-gray-500' : ''}`} />
                </button>
            </Link>

            <Link href='/search'>
                <button className='flex flex-col items-center'>
                    <Icon theme='search' className={`text-2xl ${activeScreen !== 'search' ? 'text-gray-500' : ''}`} />
                    <Typography
                        title='Search'
                        className={`text-sm ${activeScreen !== 'search' ? 'text-gray-500' : ''}`}
                    />
                </button>
            </Link>

            <Link href='/library'>
                <button className='flex flex-col items-center'>
                    <Icon theme='library' className={`text-2xl ${activeScreen !== 'library' ? 'text-gray-500' : ''}`} />
                    <Typography
                        title='Library'
                        className={`text-sm ${activeScreen !== 'library' ? 'text-gray-500' : ''}`}
                    />
                </button>
            </Link>
        </nav>
    );
};

export default NavigationBar;
