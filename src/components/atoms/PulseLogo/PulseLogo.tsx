import { motion, Variants } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';

const pulseVariants: Variants = {
    initial: { opacity: 0.6, scale: 1 },
    pulse: {
        opacity: [0.6, 0.6, 0.6, 0.6, 0],
        scale: [1, 1, 1, 1, 1.5],
        transition: { duration: 3, repeat: Infinity }
    }
};

const PulseLogo = () => (
    <div className='relative'>
        <motion.div
            variants={pulseVariants}
            initial='initial'
            animate='pulse'
            className='absolute inset-0 rounded-full bg-green-500'
        />
        <FaSpotify className='relative rounded-full bg-zinc-800 text-6xl text-green-500 shadow-[inset_0_0_0_5px] shadow-green-500' />
    </div>
);

export default PulseLogo;
