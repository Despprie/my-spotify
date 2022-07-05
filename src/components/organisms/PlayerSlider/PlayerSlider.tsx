import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { UseQueryResult } from 'react-query';
import Typography from '~/components/atoms/Typography';
import {
    usePlaybackProgress,
    useSetPlayerPosition,
    useSyncHandleWithProgress
} from '~/components/organisms/PlayerSlider/hooks';
import { SpotifyPlaybackState } from '~/hooks/usePlaybackState';

type PlayerSliderProps = { playbackState: UseQueryResult<SpotifyPlaybackState, unknown> };

const PlayerSlider = ({ playbackState }: PlayerSliderProps) => {
    const HANDLE_SIZE = 16;
    const handle = useRef<HTMLDivElement>(null);
    const handleX = useMotionValue(0);
    const handleProgress = useTransform(handleX, value => value + HANDLE_SIZE / 2);
    const handleBackground = useMotionTemplate`linear-gradient(90deg, #fff ${handleProgress}px, #6B7280 0)`;

    const constraints = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const { progress, setProgress, duration, passedTime } = usePlaybackProgress(playbackState);
    const progressBar = useRef<HTMLDivElement>(null);
    useSyncHandleWithProgress(handleX, progress, progressBar);

    const setPlayerPosition = useSetPlayerPosition();

    const updateProgress = () => {
        if (!progressBar.current || !handle.current) return;

        const handleBounds = handle.current.getBoundingClientRect();
        const middleOfHandle = handleBounds.x + handleBounds.width / 2;

        const progressBarBounds = progressBar.current.getBoundingClientRect();
        const newProgress = (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;

        setProgress(newProgress * 100);
    };

    const repositionHandle = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!progressBar.current) return;

        const { left, width } = progressBar.current.getBoundingClientRect();
        const mousePosition = event.pageX - left;

        const newProgress = Math.max(0, Math.min(mousePosition / width, 1));
        const newValue = newProgress * 100;

        setProgress(newValue);
        animate(handleX, newProgress * width, { type: 'spring', bounce: 0 });

        setPlayerPosition.mutate(progress);
    };

    return (
        <div className='my-5'>
            <motion.div
                className='relative flex h-1 w-full items-center rounded-full bg-gray-500'
                style={{ background: handleBackground }}
            >
                <div
                    ref={progressBar}
                    className='absolute h-2'
                    style={{ left: HANDLE_SIZE / 2, right: HANDLE_SIZE / 2 }}
                />
                <div ref={constraints} className='w-full'>
                    <motion.div
                        ref={handle}
                        drag='x'
                        dragConstraints={constraints}
                        dragElastic={0}
                        dragMomentum={false}
                        onDrag={updateProgress}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => {
                            setIsDragging(false);
                            setPlayerPosition.mutate(progress);
                        }}
                        onPointerDown={() => setIsDragging(true)}
                        onPointerUp={() => {
                            setIsDragging(false);
                        }}
                        animate={{ scale: isDragging ? 1.5 : 1 }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className='relative z-10 aspect-square cursor-pointer rounded-full bg-white'
                        style={{ scale: isDragging ? 1.5 : 1, width: HANDLE_SIZE, x: handleX }}
                    />
                </div>
                <div className='absolute h-3 w-full' onPointerDown={repositionHandle} />
            </motion.div>

            <div className='mt-2 flex items-center justify-between'>
                <Typography title={passedTime.toString().replace('.', ':')} className='text-xs text-gray-500' />
                <Typography title={duration.toString().replace('.', ':')} className='text-xs text-gray-500' />
            </div>
        </div>
    );
};

export default PlayerSlider;
