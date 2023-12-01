import { Outlet } from "react-router-dom"
import SecondNavMovie from "../../components/movie/SecondNavMovie"

const Movie = () => {

    return (
        <>
            <SecondNavMovie />
            <Outlet />
        </>
    )
}

export default Movie