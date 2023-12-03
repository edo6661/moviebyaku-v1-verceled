import { useCreditsMovieQuery } from "../../features/movie/movieApiSlice";
import ErrorMessage from "../errAndLoading/TemporaryError";
import AlterTitles from './AlterTitles';
import CreditSingleMovie from "./CreditSingleMovie";
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

    const errMsg = isError && error && <ErrorMessage error={error} />


    return (
        <>
            <div className=" items-center">
                <h4 className="text-black dark:text-white headersSingleMovie mb-4 containerScrollSingleMovie">{!isLoading && !isError && credits?.cast?.length ? 'Top Billed Cast' : 'Empty Cast'}</h4>
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
                <div className=' containerDetailsSingleMovie '>
                    <div className='secondInnerSingleMovie buttonKeywordMovie'>
                        <p className='headersSingleMovie'>Status</p>
                        <p className=' text-base'>{status?.length ? status : 'Empty Status'}</p>
                    </div>
                    <div className="buttonKeywordMovie">
                        <p className='singleMovieTitle'>Budget</p>
                        <p className='text-base'>{budget ? budget?.toLocaleString('id-ID') : 'Empty Budget'}</p>
                    </div>
                    <div className="buttonKeywordMovie">
                        <p className='singleMovieTitle'>Revenue</p>
                        <p className='text-base'>{revenue ? revenue?.toLocaleString('id-ID') : 'Empty Revenue'}</p>
                    </div>
                </div>
                <div className=" secondContainerSingleMovie">
                    <ReviewsSection id={id} />
                </div>
                <div className="containerDetailsSingleMovie">
                    <MovieKeywords id={id} />
                </div>
                <div className=" secondContainerSingleMovie">
                    <MediaMovie id={id} />
                </div>
                <div className="containerDetailsSingleMovie">
                    <AlterTitles id={id} />
                </div>
                <div className=" secondContainerSingleMovie">
                    <RecomsSingleMovie id={id} />
                </div>
                <div className="containerDetailsSingleMovie">
                    <p>Something</p>
                </div>
                <div className=" secondContainerSingleMovie">
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