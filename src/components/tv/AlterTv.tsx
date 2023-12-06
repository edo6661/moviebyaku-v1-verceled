import Flag from "react-world-flags";
import { useAlterTitleTvQuery } from "../../features/tv/tvApiSlice";
import upperFirst from "../../utils/upperFirst";
import ErrorMessage from "../errAndLoading/TemporaryError";

const AlterTv = ({ id }: { id: string }) => {
    const { data: alters, isError: isErrK, error: errK, isLoading } = useAlterTitleTvQuery(id);
    const errMsgK = isErrK && errK && <ErrorMessage error={errK} />
    console.log(alters)
    return (
        <>
            {errMsgK}
            <h6 className="headersSingleMovie">{!isErrK && !isLoading && alters?.results.length ? 'Alter Title' : "No Alter Title"}</h6>
            <div className=" innerKeywordAlter">
                {alters?.results.slice(0, 6).map((title, i) => {
                    return (
                        <div className=" w-full" key={i}>
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

export default AlterTv