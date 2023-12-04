import { Outlet, useLocation } from "react-router-dom";
import SecondNavMovie from "../../components/movie/SecondNavMovie";
import ThirdNavMovie from "../../components/singleMovie/ThirdNavMovie";

const Movie = () => {

    const location = useLocation();
    const notMain = location.pathname.includes('main')


    return (
        <>
            <SecondNavMovie />
            {!notMain && <ThirdNavMovie />}
            <Outlet />
        </>
    )
}

export default Movie