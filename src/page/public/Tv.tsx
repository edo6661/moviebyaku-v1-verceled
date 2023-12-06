import { Outlet, useLocation, useParams } from "react-router-dom";
import ThirdNav from "../../components/ThirdNav";
import ErrorMessage from "../../components/errAndLoading/TemporaryError";
import SecondNavMovie from "../../components/movie/SecondNavMovie";
import { useTvByIdQuery } from "../../features/tv/tvApiSlice";
const Tv = () => {
    const { id } = useParams()
    const location = useLocation();
    const isMainPage = location.pathname === `/tv/${id}/` || location.pathname === `/tv/${id}`;
    const isMain = location.pathname === `/tv/${id}/main`;

    const { data, isError, error, isLoading } = useTvByIdQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />

    if (isError) {
        return errMsg
    }


    return (
        <>
            {!isLoading && <SecondNavMovie />}
            {data && !isMain && !isMainPage && <ThirdNav poster_path={data?.poster_path ?? ''} isLoading={isLoading} name={data.name} first_air_date={data.first_air_date} backdrop_path={data.backdrop_path ?? ''} />}
            {errMsg}
            <Outlet />
        </>
    )
}

export default Tv