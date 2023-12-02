import { useMovieKeywordsQuery } from "../../features/movie/movieApiSlice";
import ErrorMessage from "../errAndLoading/TemporaryError";

const MovieKeywords = ({ id }: { id: string }) => {
    const { data: keywords, isError: isErrK, error: errK } = useMovieKeywordsQuery(id);
    const errMsgK = isErrK && errK && <ErrorMessage error={errK} />
    return (
        <>
            {errMsgK}
            <h6>Keyword</h6>
            <div className=" flex flex-wrap gap-y-2 gap-x-4">
                {keywords?.keywords.slice(0, 6).map((keyword) => {
                    return (
                        <div className="" key={keyword.id}>
                            <button className="keyword" >{keyword.name}</button>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default MovieKeywords