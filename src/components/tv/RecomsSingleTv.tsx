import { useRecomsTvQuery } from "../../features/tv/tvApiSlice"
import ErrorMessage from "../errAndLoading/TemporaryError"
import RecomsTv from "./RecomsTv"

const RecomsSingleTv = ({ id }: { id: string }) => {
    const { data, isLoading, isError, error } = useRecomsTvQuery(id)

    if (isError && error) return <ErrorMessage error={error} />
    return (
        <>
            <h6 className="headersSingleMovie mb-3">{!isLoading && !isError && data?.results.length ? 'Recommendations' : 'No Recoms'}</h6>
            <div className="containerScrollSingleMovie relative gap-0">
                {data?.results.slice(0, 12).map((recoms) => {
                    return (
                        <RecomsTv key={recoms.id} {...recoms} />
                    )
                })}
            </div>
        </>
    )


}

export default RecomsSingleTv