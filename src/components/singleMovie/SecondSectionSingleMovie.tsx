import { useCreditsMovieQuery } from "../../features/movie/movieApiSlice";
import ErrorMessage from "../errAndLoading/TemporaryError";
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
            <h4>Top Billed Cast</h4>
            {errMsg}
            <article className=' secondContainerSingleDetails'>
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
                <div className=" col-span-4">
                    <p>Reviews</p>
                </div>
                <div className="containerDetailsSingleMovie">
                    <p>Keyword</p>
                </div>
                <div className=" col-span-4">
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