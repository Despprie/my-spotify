import Image from 'next/image';
import Typography from '~/components/atoms/Typography';
import useCurrentUser from '~/hooks/useCurrentUser';

const HomeHeader = () => {
    const currentUserQuery = useCurrentUser();

    return (
        <header className='mb-2 mt-5 grid grid-cols-[1fr_auto] px-2'>
            <Typography
                title={`Welcome back${currentUserQuery.isSuccess ? ' ' + currentUserQuery.data.id : ''}!`}
                className='text-2xl font-semibold'
            />

            {currentUserQuery.isSuccess && (
                <button className='relative h-12 w-12 -translate-y-1/4 overflow-hidden rounded-full'>
                    <Image
                        src={currentUserQuery.data.images[0].url}
                        width={10}
                        height={10}
                        layout='responsive'
                        alt='profile picture'
                        className='bg-zinc-800'
                    />
                </button>
            )}
        </header>
    );
};

export default HomeHeader;
