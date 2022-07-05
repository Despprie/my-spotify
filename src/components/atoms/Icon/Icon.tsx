import { IconBaseProps } from 'react-icons';
import { AiFillHome, AiFillStepForward, AiOutlinePause, AiOutlineSearch } from 'react-icons/ai';
import { BiLibrary, BiShuffle } from 'react-icons/bi';
import { BsChevronRight, BsPlayFill } from 'react-icons/bs';
import { FaSpotify } from 'react-icons/fa';
import { MdRepeat, MdRepeatOne } from 'react-icons/md';

type IconProps = IconBaseProps & {
    theme:
        | 'spotify'
        | 'home'
        | 'search'
        | 'library'
        | 'cheveron'
        | 'play'
        | 'pause'
        | 'forward'
        | 'shuffle'
        | 'repeat'
        | 'repeat1';
};

const Icon = ({ theme, ...otherProps }: IconProps) => {
    switch (theme) {
        case 'spotify':
            return <FaSpotify {...otherProps} />;
        case 'home':
            return <AiFillHome {...otherProps} />;
        case 'search':
            return <AiOutlineSearch {...otherProps} />;
        case 'library':
            return <BiLibrary {...otherProps} />;
        case 'cheveron':
            return <BsChevronRight {...otherProps} />;
        case 'play':
            return <BsPlayFill {...otherProps} />;
        case 'pause':
            return <AiOutlinePause {...otherProps} />;
        case 'forward':
            return <AiFillStepForward {...otherProps} />;
        case 'shuffle':
            return <BiShuffle {...otherProps} />;
        case 'repeat':
            return <MdRepeat {...otherProps} />;
        case 'repeat1':
            return <MdRepeatOne {...otherProps} />;
        default:
            return null;
    }
};

export default Icon;
