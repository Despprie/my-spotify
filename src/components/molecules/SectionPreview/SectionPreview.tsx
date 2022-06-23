import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Icon from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';
import { SpotifyAlbum, SpotifyArtist, SpotifyPlaylist, SpotifyTrack } from '~/utils/spotify';

type PlaylistPreviewProps = { item: SpotifyPlaylist | SpotifyAlbum | SpotifyTrack | SpotifyArtist };

const SectionPreview = ({ item }: PlaylistPreviewProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHovered, setContainerHovered] = useState(false);

    const onMouseMouse = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!containerRef.current) return;

        const { x, y } = containerRef.current.getBoundingClientRect();
        containerRef.current.style.setProperty('--x', `${event.clientX - x}`);
        containerRef.current.style.setProperty('--y', `${event.clientY - y}`);
    };

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setContainerHovered(true)}
            onMouseLeave={() => setContainerHovered(false)}
            onMouseMove={'followers' in item ? undefined : onMouseMouse}
            className={`cursor-pointer ${
                'followers' in item ? 'w-24 lg:w-36' : 'background-blur w-36 rounded-md bg-zinc-800 p-2 lg:w-44'
            }`}
        >
            <div className='relative'>
                <Image
                    src={'album' in item ? item.album.images[0].url : item.images[0].url}
                    width={20}
                    height={20}
                    alt={item.name}
                    layout='responsive'
                    className={`bg-zinc-800 ${'followers' in item ? 'rounded-full' : 'rounded-md'}`}
                />

                <AnimatePresence>
                    {containerHovered && !('followers' in item) && (
                        <motion.div
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
                            exit={{ y: 5, opacity: 0, transition: { duration: 0.3 } }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 1, transition: { duration: 0.1 } }}
                            transition={{ type: 'spring' }}
                            className='absolute right-2 bottom-2 rounded-full bg-green-500 p-3'
                        >
                            <Icon theme='play' className='translate-x-[1px] text-3xl' />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Typography
                title={item.name}
                className={`mt-1 truncate text-sm lg:mt-2 lg:text-base ${'followers' in item ? 'text-center' : ''}`}
            />
        </div>
    );
};

export default SectionPreview;
