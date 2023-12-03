import { useRecomsMovieQuery } from "../../features/movie/movieApiSlice"
import ErrorMessage from "../errAndLoading/TemporaryError"
import RecomSingleMovie from "./RecomSingleMovie"

const RecomsSingleMovie = ({ id }: { id: string }) => {
    const { data, isLoading, isError, error } = useRecomsMovieQuery(id)

    if (isError && error) return <ErrorMessage error={error} />

    return (
        <>
            <h6 className="headersSingleMovie mb-3">{!isLoading && !isError && data?.results.length ? 'Recommendations' : 'No Recoms'}</h6>
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

export default RecomsSingleMovie