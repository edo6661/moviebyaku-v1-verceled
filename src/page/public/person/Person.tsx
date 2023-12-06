import { Outlet, useLocation, useParams } from "react-router-dom";
import ThirdNav from "../../../components/ThirdNav";
import ErrorMessage from "../../../components/errAndLoading/TemporaryError";
import SecondNavMovie from "../../../components/movie/SecondNavMovie";
import { usePersonByIdQuery } from "../../../features/people/peopleApiSlice";
const Person = () => {
    const { id } = useParams()
    const location = useLocation();
    const isMainPage = location.pathname === `/person/${id}/` || location.pathname === `/person/${id}`;
    const isMain = location.pathname === `/person/${id}/main`;

    const { data, isError, error, isLoading } = usePersonByIdQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />

    if (isError) {
        return errMsg
    }

    return (
        <>
            {!isLoading && <SecondNavMovie />}
            {data && !isMain && !isMainPage && <ThirdNav isLoading={isLoading} name={data.name} poster_path={data.profile_path} />}
            {errMsg}
            <Outlet />
        </>
    )
}

export default Person