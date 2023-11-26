import { Outlet } from "react-router-dom"
import SecondNavMovie from "../../components/movie/SecondNavMovie"

const Tv = () => {
    return (
        <>
            <SecondNavMovie />
            <Outlet />
        </>
    )
}

export default Tv