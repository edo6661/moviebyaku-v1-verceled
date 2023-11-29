import { useState } from 'react';
import { FaBookmark, FaHeart, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useFavoriteMovieMutation, useWatchListMovieMutation } from '../../features/movie/movieApiSlice';
import useProvider from '../../hooks/useProvider';
import { toggleStatus } from '../../hooks/useStatus';

const SliderMenu = ({ id }: { id: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setActiveStar] = useState(false)
    const { favorite, watchlist, setFavorite, setWatchlist, profile, sessionId } = useProvider()
    const [addFavorite, { isLoading: loadingFav, isError: isErrFav }] = useFavoriteMovieMutation();
    const [addWatchlist, { isLoading: loadingWl, isError: isErrWl }] = useWatchListMovieMutation();

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

    const heartColor = !isErrFav && !loadingFav && favorite[id] ? 'red' : 'black';
    const bookMarkColor = !isErrWl && !loadingWl && watchlist[id] ? 'green' : 'black';
    const fav = !loadingFav ? 'Favorite' : 'Loading...'
    const wl = !loadingWl ? 'Watchlist' : 'Loading...'

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
        {
            title: 'Your Rating',
            icons: <FaStar size={15} />,
            onClick: () => setActiveStar(prev => !prev)
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
