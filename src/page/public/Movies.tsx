import { Outlet } from "react-router-dom"
import SecondNavMovie from "../../components/movie/SecondNavMovie"

const Movies = () => {

    return (
        <>
            <SecondNavMovie />
            <Outlet />
        </>
    )
}

export default Movies