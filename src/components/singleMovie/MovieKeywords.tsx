import { useMovieKeywordsQuery } from "../../features/movie/movieApiSlice";
import upperFirst from "../../utils/upperFirst";
import ErrorMessage from "../errAndLoading/TemporaryError";

const MovieKeywords = ({ id }: { id: string }) => {
    const { data: keywords, isError: isErrK, error: errK, isLoading } = useMovieKeywordsQuery(id);
    const errMsgK = isErrK && errK && <ErrorMessage error={errK} />
    return (
        <>
            {errMsgK}
            <h6 className="headersSingleMovie">{!isErrK && !isLoading && keywords?.keywords.length ? 'Keywords' : "No Keyword"}</h6>
            <div className=" grid grid-cols-1 gap-y-2 gap-x-4">
                {keywords?.keywords.slice(0, 6).map((keyword) => {
                    return (
                        <div className=" w-full" key={keyword.id}>
                            <button className="buttonKeywordMovie" >{upperFirst(keyword.name)}</button>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default MovieKeywords