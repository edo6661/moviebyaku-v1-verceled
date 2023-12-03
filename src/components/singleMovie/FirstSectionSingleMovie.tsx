import { FaBookmark, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFavoriteMovieMutation, useWatchListMovieMutation } from "../../features/movie/movieApiSlice";
import useProvider from '../../hooks/useProvider';
import { toggleStatus } from "../../hooks/useStatus";
import baseImageUrl from "../../utils/baseImgUrl";
import ErrorMessage from "../errAndLoading/TemporaryError";

const FirstSectionSingleMovie = ({ title, release_date, backdrop_path, poster_path, id, idParams, vote_average, genres, tagline, overview }: MovieDetails) => {

    const { favorite, watchlist, setFavorite, setWatchlist, profile, sessionId, expanded } = useProvider()

    const [addFavorite, { isLoading: loadingFav, isError: isErrFav, error: errFav }] = useFavoriteMovieMutation();
    const [addWatchlist, { isLoading: loadingWl, isError: isErrWl, error: errWl }] = useWatchListMovieMutation();

    const errMsgFav = isErrFav && errFav && <ErrorMessage error={errFav} />
    const errMsgWl = isErrWl && errWl && <ErrorMessage error={errWl} />

    let notNullId = ''

    if (idParams) {
        notNullId = id
    }

    const heartColor = !isErrFav && !loadingFav && favorite[notNullId] ? 'red' : 'white';
    const bookMarkColor = !isErrWl && !loadingWl && watchlist[notNullId] ? 'green' : 'white';

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
        media_id: notNullId,
        session_id: sessionId
    }
    const argFav = {
        ...initialArg,
        favorite: !favorite[notNullId]
    }
    const argWl = {
        ...initialArg,
        watchlist: !watchlist[notNullId],
    }

    const handleFav = async () => {
        if (isErrFav) {
            return toast('you must have an account id')
        } else {
            await addFavorite(argFav)
            toggleStatus(setFavorite, notNullId)
        }
    }
    const handleWl = async () => {
        if (isErrWl) {
            return toast('you must have an account id')
        } else {
            await addWatchlist(argWl)
            toggleStatus(setWatchlist, notNullId)
        }
    }

    let percentageVote;

    if (vote_average) percentageVote = Math.round(vote_average * 10)

    const backdrop = `${baseImageUrl}${backdrop_path}`



    return (
        <>
            <div className='backdropSingleMovie backDrop  '></div>
            <img className='backDrop -z-10' src={backdrop} alt="" />
            <div className='innerSingleMovie'>
                <div className={`containerPoster bg-[url()] z-20`} onClick={expanded}>
                    <img src={`${baseImageUrl}${poster_path}`} alt={title} />
                </div>
                <div className='detailsSingleMovie  '>
                    <h2 className=' '>{title} <span className='text-myWhite'>({release_date.substring(0, 4)})</span></h2>
                    <div className='secondDetailsSingleMovie'>
                        <p>({release_date}) (US)</p>
                        <div className='flex gap-1'>
                            {genres.map(g =>
                                <p key={g.name}>{g.name}</p>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-4 items-center mb-1 mt-2'>
                        <div className="score-circle">
                            <svg viewBox="0 0 36 36">
                                <path className="circle-bg"
                                    d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path className="circle"
                                    // !  membuat efek “dash” pada stroke, dan panjang dash diatur berdasarkan percentageVote.
                                    strokeDasharray={`${percentageVote}, 100`}
                                    d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <p>{percentageVote}%</p>
                        </div>
                        {menus.map((menu, i) =>
                            <button className='gap-2 flex items-center justify-center' key={i} onClick={menu.onClick}>
                                <p className=''>
                                    {menu.icons}
                                </p>
                            </button>
                        )}

                    </div>
                    <p className=' text-myWhite opacity-80'>{tagline}</p>
                    <p>{overview?.length ? 'Overview' : 'No Overview'}</p>
                    <p className="sm:text-lg text-base">{overview?.length ? overview : ''}</p>
                    {errMsgFav}
                    {errMsgWl}
                </div>
            </div>

        </>
    )
}

export default FirstSectionSingleMovie