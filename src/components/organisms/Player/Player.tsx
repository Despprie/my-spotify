import Image from 'next/image';
import Link from 'next/link';
import Typography from '~/components/atoms/Typography';
import PlayerActions from '~/components/molecules/PlayerActions';
import TrackArtists from '~/components/molecules/TrackArtists';
import PlayerSlider from '~/components/organisms/PlayerSlider';
import CardContainer from '~/components/template/CardContainer';
import usePlaybackState from '~/hooks/usePlaybackState';

const Player = () => {
    const playbackState = usePlaybackState();

    return (
        <>
            {playbackState.isSuccess && (
                <CardContainer className='w-64 p-0'>
                    <Image
                        src={playbackState.data.item.album.images[0].url}
                        alt={playbackState.data.item.name}
                        width={playbackState.data.item.album.images[0].width ?? 0}
                        height={playbackState.data.item.album.images[0].height ?? 0}
                        className='rounded-md'
                    />

                    <div className='px-4 pb-4'>
                        <Link href='#'>
                            <Typography
                                title={playbackState.data.item.name}
                                className='w-fit max-w-full cursor-pointer truncate text-lg font-medium'
                            />
                        </Link>
                        <TrackArtists artists={playbackState.data.item.artists} />
                        <PlayerSlider {...{ playbackState }} />
                        <PlayerActions {...{ playbackState }} />
                    </div>
                </CardContainer>
            )}
        </>
    );
};

export default Player;
