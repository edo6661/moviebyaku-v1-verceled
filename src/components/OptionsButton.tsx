import { FaBookmark, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFavoriteMovieMutation, useWatchListMovieMutation } from "../features/movie/movieApiSlice";
import useProvider from "../hooks/useProvider";
import { toggleStatus } from "../hooks/useStatus";
import ErrorMessage from "./errAndLoading/TemporaryError";
import PercentageVote from "./singleMovie/PercentageVote";

const OptionsButton = ({ id, percentageVote }: { id: string; percentageVote: number | undefined }) => {
    const { favorite, watchlist, setFavorite, setWatchlist, profile, sessionId } = useProvider();
    const [addFavorite, { isLoading: loadingFav, isError: isErrFav, error: errFav }] = useFavoriteMovieMutation();
    const [addWatchlist, { isLoading: loadingWl, isError: isErrWl, error: errWl }] = useWatchListMovieMutation();

    const heartColor = !isErrFav && !loadingFav && favorite[id] ? 'red' : 'white';
    const bookMarkColor = !isErrWl && !loadingWl && watchlist[id] ? 'green' : 'white';

    const menus = [
        {
            icons: <FaHeart size={30} color={heartColor} />,
            onClick: () => handleFav()
        },
        {
            icons: <FaBookmark size={30} color={bookMarkColor} />,
            onClick: () => handleWl()
        },
    ]


    const initialArg = {
        account_id: profile.id.toString(),
        media_type: 'movie',
        media_id: id,
        session_id: sessionId
    }
    const argFav = {
        ...initialArg,
        favorite: !favorite[id]
    }
    const argWl = {
        ...initialArg,
        watchlist: !watchlist[id],
    }

    const handleFav = async () => {
        if (isErrFav) {
            return toast('you must have an account id')
        } else {
            await addFavorite(argFav)
            toggleStatus(setFavorite, id)
        }
    }
    const handleWl = async () => {
        if (isErrWl) {
            return toast('you must have an account id')
        } else {
            await addWatchlist(argWl)
            toggleStatus(setWatchlist, id)
        }
    }

    const errMsgFav = isErrFav && errFav && <ErrorMessage error={errFav} />
    const errMsgWl = isErrWl && errWl && <ErrorMessage error={errWl} />


    if (isErrFav) return errMsgFav
    if (isErrWl) return errMsgWl


    return (
        <div className='flex gap-4 items-center mb-1 mt-2'>
            <PercentageVote percentageVote={percentageVote ?? 0} />
            {menus.map((menu, i) =>
                <button className='gap-2 flex items-center justify-center' key={i} onClick={menu.onClick}>
                    <p className=''>
                        {menu.icons}
                    </p>
                </button>
            )}

        </div>
    );


}

export default OptionsButton