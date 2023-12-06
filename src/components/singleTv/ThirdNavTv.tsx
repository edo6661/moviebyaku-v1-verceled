import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useMovieByIdQuery } from "../../features/movie/movieApiSlice";
import baseImageUrl from "../../utils/baseImgUrl";
import ErrorMessage from "../errAndLoading/TemporaryError";
const ThirdNavTv = () => {
    const { id } = useParams()
    const { data, isError, error, isLoading } = useMovieByIdQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />

    if (isError) {
        return errMsg
    }

    return (
        <section className="containerThirdNavMovie"
            style={{ backgroundImage: `url(${baseImageUrl}/${data?.backdrop_path})` }}>
            {errMsg}
            {!isLoading && (
                <div className=''>
                    <div>
                        <img className=" w-24 rounded-xl" src={baseImageUrl + data?.poster_path} alt={data?.title} />
                    </div>
                    <div className="innerThirdNavMovie">
                        <h1 className='text-white' >{data?.title}
                            <span >({data?.release_date.substring(0, 4)})</span></h1>
                        <Link to="main">
                            <span>{<FaArrowLeft size={18} />}</span>
                            <span>Back to Main</span>
                        </Link>
                    </div>
                </div>

            )}
        </section>
    )
}

export default ThirdNavTv