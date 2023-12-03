import Flag from "react-world-flags";
import { useAlterTitleMovieQuery } from "../../features/movie/movieApiSlice";
import upperFirst from "../../utils/upperFirst";
import ErrorMessage from "../errAndLoading/TemporaryError";

const AlterTitles = ({ id }: { id: string }) => {
    const { data: alters, isError: isErrK, error: errK, isLoading } = useAlterTitleMovieQuery(id);
    const errMsgK = isErrK && errK && <ErrorMessage error={errK} />
    return (
        <>
            {errMsgK}
            <h6 className="headersSingleMovie">{!isErrK && !isLoading && alters?.titles.length ? 'Alter Title' : "No Alter Title"}</h6>
            <div className=" grid grid-cols-1 gap-y-2 gap-x-4">
                {alters?.titles.slice(0, 7).map((title) => {
                    return (
                        <div className=" w-full" key={title.iso_3166_1}>
                            <div className="buttonKeywordMovie flex items-center gap-2">
                                <Flag code={title.iso_3166_1} className=" w-7" />
                                <p>{upperFirst(title.title)}</p>
                            </div>

                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default AlterTitles