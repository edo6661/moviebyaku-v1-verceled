import { useCreditsMovieQuery } from "../../features/movie/movieApiSlice";
import ErrorMessage from "../errAndLoading/TemporaryError";
import MediaMovie from "./MediaMovie";
import MovieKeywords from "./MovieKeywords";
import ReviewsSection from "./ReviewsSection";
interface Props {
    id: string;
    status?: string;
    budget?: number;
    revenue?: number;
}
const SecondSectionSingleMovie = ({ id, status, budget, revenue }: Props) => {
    const { data: credits, isError, error } = useCreditsMovieQuery(id ?? '')


    const errMsg = isError && error && <ErrorMessage error={error} />
    return (
        <>
            <h4 className="text-black dark:text-white">Top Billed Cast</h4>
            {errMsg}
            <article className=' secondContainerSingleDetails text-black dark:text-white'>
                <div className='containerScrollSingleMovie'>
                    {credits?.cast.slice(0, 30).map((credit) => {
                        return (
                            <div key={credit.id}
                                className='singleDetailsCrsl'>
                                <img src={`https://image.tmdb.org/t/p/original${credit.profile_path}`} alt={credit.name}
                                    className=' ' />
                                <p className=" singleMovieTitle">{credit.name}</p>
                                <p className=" text-base">{credit.character}</p>
                            </div>
                        )
                    })}
                </div>
                <div className=' containerDetailsSingleMovie'>
                    <div className='secondInnerSingleMovie'>
                        <p className='singleMovieTitle'>Status</p>
                        <p className=' text-base'>{status}</p>
                    </div>
                    <div>
                        <p className='singleMovieTitle'>Budget</p>
                        <p className='text-base'>{budget?.toLocaleString('id-ID')}</p>
                    </div>
                    <div>
                        <p className='singleMovieTitle'>Revenue</p>
                        <p className='text-base'>{revenue?.toLocaleString('id-ID')}</p>
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
                    <p>Something</p>
                </div>
                <div className=" col-span-3">
                    <p>Recoms</p>
                </div>
                <div className="containerDetailsSingleMovie">
                    <p>Something</p>
                </div>
            </article>
        </>
    )
}

export default SecondSectionSingleMovie