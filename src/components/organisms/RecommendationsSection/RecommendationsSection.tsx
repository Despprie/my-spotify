import { v4 as uuid } from 'uuid';
import SectionItemPreview from '~/components/molecules/SectionPreview';
import HomeSection from '~/components/template/HomeSection';
import useRecommendations from '~/hooks/useRecommendations';

const RecommendationsSection = () => {
    const recommendationsQuery = useRecommendations();

    return (
        <HomeSection title='Tracks you might like'>
            {recommendationsQuery.isSuccess &&
                recommendationsQuery.data.map(track => (
                    <li key={uuid()}>
                        <SectionItemPreview item={track} />
                    </li>
                ))}
        </HomeSection>
    );
};

export default RecommendationsSection;
