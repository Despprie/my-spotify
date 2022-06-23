import { IconBaseProps } from 'react-icons';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { BiLibrary } from 'react-icons/bi';
import { BsChevronRight, BsPlayFill } from 'react-icons/bs';
import { FaSpotify } from 'react-icons/fa';

type IconProps = IconBaseProps & { theme: 'spotify' | 'home' | 'search' | 'library' | 'cheveron' | 'play' };

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
        default:
            return null;
    }
};

export default Icon;
