import { IconBaseProps } from 'react-icons';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { BiLibrary } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';

type IconProps = IconBaseProps & { theme: 'home' | 'search' | 'library' | 'cheveron' };

const Icon = ({ theme, ...otherProps }: IconProps) => {
    switch (theme) {
        case 'home':
            return <AiFillHome {...otherProps} />;
        case 'search':
            return <AiOutlineSearch {...otherProps} />;
        case 'library':
            return <BiLibrary {...otherProps} />;
        case 'cheveron':
            return <BsChevronRight {...otherProps} />;
        default:
            return null;
    }
};

export default Icon;
