import { FaFacebook, FaImdb, FaInstagram, FaTwitter, FaWikipediaW } from "react-icons/fa";
import { useCreditsMovieQuery, useExternalIdQuery } from "../../features/movie/movieApiSlice";
import ErrorMessage from "../errAndLoading/TemporaryError";
import AlterTitles from './AlterTitles';
import CreditSingleMovie from "./CreditSingleMovie";
import HoverIcon from './HoverIcon';
import MediaMovie from "./MediaMovie";
import MovieKeywords from "./MovieKeywords";
import RecomsSingleMovie from "./RecomsSingleMovie";
import ReviewsSection from "./ReviewsSection";
import SimiliarSingleMovie from "./SimiliarSingleMovie";

interface Props {
    id: string;
    status?: string;
    budget?: number;
    revenue?: number;
}
const SecondSectionSingleMovie = ({ id, status, budget, revenue }: Props) => {
    const { data: credits, isError, error, isLoading } = useCreditsMovieQuery(id ?? '')
    const { data: external, isError: isErrE, isLoading: loadingE, error: errE } = useExternalIdQuery(id ?? '')

    const errMsg = isError && error && <ErrorMessage error={error} />
    const errMsgE = isErrE && errE && <ErrorMessage error={errE} />

    return (
        <>
            <div className="secondContainerSingleDetails items-center">
                <h4 className="text-black dark:text-white headersSingleMovie mb-4 containerScrollSingleMovie">{!isLoading && !isError && credits?.cast?.length ? 'Top Billed Cast' : 'Empty Cast'}</h4>
                {!isErrE && !loadingE && external ?
                    <div className="flex gap-2 justify-between">
                        {errMsgE}
                        {external?.facebook_id ? <HoverIcon IconComponent={FaFacebook} color="#4267B2" to={`https://www.facebook.com//${external?.facebook_id}`} /> : ''}
                        {external?.twitter_id ? <HoverIcon IconComponent={FaTwitter} color="#1DA1F2" to={`https://twitter.com/${external?.twitter_id}`} /> : ''}
                        {external?.instagram_id ? <HoverIcon IconComponent={FaInstagram} color="#405DE6" to={`https://www.instagram.com/${external?.instagram_id}`} /> : ''}
                        {external?.wikidata_id ? <HoverIcon IconComponent={FaWikipediaW} color="#C0C0C0" to={`https://www.wikidata.org/wiki/${external?.wikidata_id}`} /> : ''}
                        {external?.imdb_id ? <HoverIcon IconComponent={FaImdb} color="#deb522" to={`https://www.imdb.com/title/${external?.imdb_id}`} /> : ''}
                    </div> : ''
                }
            </div>
            {errMsg}
            <article className=' secondContainerSingleDetails text-black dark:text-white'>

                <div className='containerScrollSingleMovie'>
                    {credits?.cast.slice(0, 12).map((credit) => {
                        return (
                            <CreditSingleMovie key={credit.id} {...credit} />
                        )
                    })}
                </div>
                <div className=' containerDetailsSingleMovie shadow-inner shadow-lightBlue dark:shadow-darkBlue py-4 px-6 rounded-xl'>
                    <div className='secondInnerSingleMovie'>
                        <p className='headersSingleMovie'>Status</p>
                        <p className=' text-base'>{status?.length ? status : 'Empty Status'}</p>
                    </div>
                    <div>
                        <p className='singleMovieTitle'>Budget</p>
                        <p className='text-base'>{budget ? budget?.toLocaleString('id-ID') : 'Empty Budget'}</p>
                    </div>
                    <div>
                        <p className='singleMovieTitle'>Revenue</p>
                        <p className='text-base'>{revenue ? revenue?.toLocaleString('id-ID') : 'Empty Revenue'}</p>
                    </div>
                </div>
                <div className=" col-span-3">
                    <ReviewsSection id={id} />
                </div>
                <div className="containerDetailsSingleMovie">
                    <MovieKeywords id={id} />
                </div>
                <div className=" col-span-3">
                    <MediaMovie id={id} />
                </div>
                <div className="containerDetailsSingleMovie">
                    <AlterTitles id={id} />
                </div>
                <div className=" col-span-3">
                    <RecomsSingleMovie id={id} />
                </div>
                <div className="containerDetailsSingleMovie">
                    <p>Something</p>
                </div>
                <div className=" col-span-3">
                    <SimiliarSingleMovie id={id} />
                </div>
                <div className="containerDetailsSingleMovie">
                    <p>Something</p>
                </div>
            </article>
        </>
    )
}

export default SecondSectionSingleMovie