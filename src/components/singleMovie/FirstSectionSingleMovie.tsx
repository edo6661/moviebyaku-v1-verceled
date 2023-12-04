import { FaBookmark, FaFacebook, FaHeart, FaImdb, FaInstagram, FaTwitter, FaWikipediaW } from "react-icons/fa";
import { toast } from "react-toastify";
import { useExternalIdQuery, useFavoriteMovieMutation, useWatchListMovieMutation } from "../../features/movie/movieApiSlice";
import useProvider from '../../hooks/useProvider';
import { toggleStatus } from "../../hooks/useStatus";
import baseImageUrl from "../../utils/baseImgUrl";
import ErrorMessage from "../errAndLoading/TemporaryError";
import HoverIcon from "./HoverIcon";
import PercentageVote from './PercentageVote';

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


    const { data: external, isError: isErrE, isLoading: loadingE, error: errE } = useExternalIdQuery(id ?? '')
    const errMsgE = isErrE && errE && <ErrorMessage error={errE} />




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
                        <PercentageVote percentageVote={percentageVote ?? 0} />
                        {menus.map((menu, i) =>
                            <button className='gap-2 flex items-center justify-center' key={i} onClick={menu.onClick}>
                                <p className=''>
                                    {menu.icons}
                                </p>
                            </button>
                        )}

                    </div>
                    <p className=' text-myWhite opacity-80'>{tagline}</p>
                    <p className="sm:text-xl text-lg font-semibold">{overview?.length ? 'Overview' : 'No Overview'}</p>
                    <p className="sm:text-lg text-base">{overview?.length ? overview : ''}</p>
                    {!isErrE && !loadingE && external ?
                        <div className="flex gap-2 mt-2 ">
                            {errMsgE}
                            {external?.facebook_id ? <HoverIcon IconComponent={FaFacebook} color="#4267B2" to={`https://www.facebook.com//${external?.facebook_id}`} /> : ''}
                            {external?.twitter_id ? <HoverIcon IconComponent={FaTwitter} color="#1DA1F2" to={`https://twitter.com/${external?.twitter_id}`} /> : ''}
                            {external?.instagram_id ? <HoverIcon IconComponent={FaInstagram} color="#405DE6" to={`https://www.instagram.com/${external?.instagram_id}`} /> : ''}
                            {external?.wikidata_id ? <HoverIcon IconComponent={FaWikipediaW} color="#C0C0C0" to={`https://www.wikidata.org/wiki/${external?.wikidata_id}`} /> : ''}
                            {external?.imdb_id ? <HoverIcon IconComponent={FaImdb} color="#deb522" to={`https://www.imdb.com/title/${external?.imdb_id}`} /> : ''}
                        </div> : ''
                    }
                    {errMsgFav}
                    {errMsgWl}
                </div>
            </div>

        </>
    )
}

export default FirstSectionSingleMovie