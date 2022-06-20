import { v4 as uuid } from 'uuid';
import PlaylistAndAlbumPreview from '~/components/molecules/PlaylistPreview';
import HomeSection from '~/components/template/HomeSection';
import useNewReleases from '~/hooks/useNewReleases';

const NewReleasesSection = () => {
    const newReleasesQuery = useNewReleases();

    return (
        <HomeSection title='New Releases'>
            {newReleasesQuery.isSuccess &&
                newReleasesQuery.data.items.map(album => (
                    <li key={uuid()}>
                        <PlaylistAndAlbumPreview item={album} />
                    </li>
                ))}
        </HomeSection>
    );
};

export default NewReleasesSection;
