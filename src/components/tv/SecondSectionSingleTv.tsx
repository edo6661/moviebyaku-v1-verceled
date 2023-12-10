import { useCreditsTvQuery } from "../../features/tv/tvApiSlice";
import ErrorMessage from "../errAndLoading/TemporaryError";
import CreditSingleMovie from "../singleMovie/CreditSingleMovie";
import AlterTv from "./AlterTv";
import MediaTv from "./MediaTv";
import RecomsSingleTv from "./RecomsSingleTv";
import ReviewsTv from "./ReviewsTv";
import SimiliarTv from "./SimiliarTv";
import TvKeyword from "./TvKeywords";

interface Props {
    id: string;
    status: string;
    type: string;
    original_language: string;
}

const SecondSectionSingleTv = ({ id, status, type, original_language }: Props) => {
    const { data: credits, isError, error, isLoading } = useCreditsTvQuery(id ?? '')

    const errMsg = isError && error && <ErrorMessage error={error} />

    if (isError) {
        return errMsg
    }

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
                        <p className='singleMovieTitle'>Type</p>
                        <p className='text-base'>{type}</p>
                    </div>
                    <div className="buttonKeywordMovie">
                        <p className='singleMovieTitle'>Original Language</p>
                        <p className='text-base'>{original_language}</p>
                    </div>
                </div>
                <div className=" secondContainerSingleMovie">
                    <ReviewsTv id={id} />
                </div>
                <div className="containerDetailsSingleMovie">
                    <TvKeyword id={id} />
                </div>
                <div className=" secondContainerSingleMovie">
                    <MediaTv id={id} />
                </div>
                <div className="containerDetailsSingleMovie">
                    <AlterTv id={id} />
                </div>
                <div className=" secondContainerSingleMovie">
                    <RecomsSingleTv id={id} />
                </div>
                <div className=" secondContainerSingleMovie">
                    <SimiliarTv id={id} />
                </div>
            </article>
        </>
    )
}

export default SecondSectionSingleTv