import { FaBookmark, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useFavoriteMovieMutation, useWatchListMovieMutation } from '../../features/movie/movieApiSlice';
import useProvider from '../../hooks/useProvider';
import { toggleStatus } from '../../hooks/useStatus';

const SliderMenu = ({ id, media_type }: { id: string; media_type?: string; }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { favorite, watchlist, setFavorite, setWatchlist, profile, sessionId } = useProvider()
    const [addFavorite, { isLoading: loadingFav, isError: isErrFav }] = useFavoriteMovieMutation();
    const [addWatchlist, { isLoading: loadingWl, isError: isErrWl }] = useWatchListMovieMutation();

    const type = media_type ? media_type : 'movie'

    const initialArg = {
        account_id: profile.id.toString(),
        media_type: type,
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

    const heartColor = !isErrFav && !loadingFav && favorite[id] ? 'red' : 'black';
    const bookMarkColor = !isErrWl && !loadingWl && watchlist[id] ? 'green' : 'black';
    const fav = !loadingFav ? 'Favorite' : 'Temporary loading nanti dibenerin puh...'
    const wl = !loadingWl ? 'Watchlist' : 'Temporary loading nanti dibenerin puh...'

    const menus = [
        {
            title: fav,
            icons: <FaHeart size={15} color={heartColor} />,
            onClick: () => handleFav()
        },
        {
            title: wl,
            icons: <FaBookmark size={15} color={bookMarkColor} />,
            onClick: () => handleWl()
        },
    ]

    return (
        <>
            {menus.map((menu, i) =>
                <button className='menuPopularMovies' key={i} onClick={menu.onClick}>
                    <span className='iconPopularMovies'>
                        {menu.icons}
                    </span>
                    <span className='ml-2'>
                        {menu.title}
                    </span>
                </button>
            )}
        </>
    )
}

export default SliderMenu
