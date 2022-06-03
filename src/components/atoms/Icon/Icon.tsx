import { IconBaseProps } from 'react-icons';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { BiLibrary } from 'react-icons/bi';

type IconProps = IconBaseProps & { theme: 'home' | 'search' | 'library' };

const Icon = ({ theme, ...otherProps }: IconProps) => {
    switch (theme) {
        case 'home':
            return <AiFillHome {...otherProps} />;
        case 'search':
            return <AiOutlineSearch {...otherProps} />;
        case 'library':
            return <BiLibrary {...otherProps} />;
        default:
            return null;
    }
};

export default Icon;
