import Image from 'next/image';
import Typography from '~/components/atoms/Typography';
import useCurrentUserQuery from '~/hooks/useCurrentUserQuery';

const HomeHeader = () => {
    const currentUserQuery = useCurrentUserQuery();

    return (
        <header className='mb-2 grid grid-cols-[1fr_auto] px-2'>
            <div>
                <Typography
                    theme='title'
                    title={`Welcome back ${currentUserQuery.data?.id}!`}
                    className='font-semibold'
                />
                <Typography title="Let's listen to something cool today" className='text-sm text-gray-500' />
            </div>

            {currentUserQuery.isSuccess && (
                <button className='h-14 w-14 overflow-hidden rounded-full'>
                    <Image
                        src={currentUserQuery.data.images[0].url}
                        width={10}
                        height={10}
                        layout='responsive'
                        alt='profile picture'
                        className='bg-zinc-700'
                    />
                </button>
            )}
        </header>
    );
};

export default HomeHeader;
