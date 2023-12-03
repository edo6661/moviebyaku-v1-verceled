import { useMovieSimiliarQuery } from "../../features/movie/movieApiSlice"
import ErrorMessage from "../errAndLoading/TemporaryError"
import RecomSingleMovie from "./RecomSingleMovie"

const SimiliarSingleMovie = ({ id }: { id: string }) => {
    const { data, isLoading, isError, error } = useMovieSimiliarQuery({ id, page: '1' })

    if (isError && error) return <ErrorMessage error={error} />

    return (
        <>
            <h6 className="headersSingleMovie mb-3">{!isLoading && !isError && data?.results.length ? 'Similiar' : 'No Simliar'}</h6>
            <div className="containerScrollSingleMovie relative gap-0">
                {data?.results.slice(0, 12).map((recoms) => {
                    return (
                        <RecomSingleMovie key={recoms.id} {...recoms} />
                    )
                })}
            </div>
        </>
    )


}

export default SimiliarSingleMovie