import Button from '~/components/atoms/Button';
import PulseLogo from '~/components/atoms/PulseLogo';
import Typography from '~/components/atoms/Typography';
import requestSpotifyAuthorization from '~/utils/requestSpotifyAuthorization';

const SignInWithSpotifyCard = () => (
    <div className='flex flex-col items-center gap-4 rounded-md border-[1px] border-zinc-700 bg-zinc-800 px-4 py-6'>
        <PulseLogo />

        <Typography theme='title' className='text-center'>
            Welcome to <span className='text-green-500'>my-spotify</span>
        </Typography>

        <Button theme='primary' onClick={requestSpotifyAuthorization} className='mt-1 transition active:scale-95'>
            Sign in with Spotify
        </Button>
    </div>
);

export default SignInWithSpotifyCard;
