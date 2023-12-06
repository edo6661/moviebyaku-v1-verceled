import { Outlet, useLocation, useParams } from "react-router-dom";
import ThirdNav from "../../components/ThirdNav";
import ErrorMessage from "../../components/errAndLoading/TemporaryError";
import SecondNavMovie from "../../components/movie/SecondNavMovie";
import { useMovieByIdQuery } from "../../features/movie/movieApiSlice";
const Movie = () => {
    const { id } = useParams()
    const location = useLocation();
    const isMainPage = location.pathname === `/movie/${id}/` || location.pathname === `/movie/${id}`;
    const isMain = location.pathname === `/movie/${id}/main`;

    const { data, isError, error, isLoading } = useMovieByIdQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />

    if (isError) {
        return errMsg
    }

    return (
        <>
            {!isLoading && <SecondNavMovie />}
            {data && !isMainPage && !isMain && <ThirdNav poster_path={data?.poster_path ?? ''} isLoading={isLoading} title={data.title} release_date={data.release_date} backdrop_path={data.backdrop_path ?? ''} />}
            {errMsg}
            <Outlet />
        </>
    )
}

export default Movie