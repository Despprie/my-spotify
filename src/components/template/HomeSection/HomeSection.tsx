import Typography from '~/components/atoms/Typography';

type HomeSectionProps = {
    title: string;
    onSectionButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
};

const HomeSection = ({ title, onSectionButtonClick, children }: HomeSectionProps) => (
    <div>
        <div className='mb-2 flex items-center justify-between px-2'>
            <Typography theme='subtitle' {...{ title }} />
            <button onClick={onSectionButtonClick} className='text-white/50'>
                see more
            </button>
        </div>

        <ul className='disable-scrollbar flex w-full gap-3 overflow-x-auto px-2 py-1'>{children}</ul>
    </div>
);

export default HomeSection;
