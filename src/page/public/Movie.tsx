import { Outlet } from "react-router-dom"
import SearchBar from "../../components/SearchBar"
import SecondNavMovie from "../../components/movie/SecondNavMovie"

const Movie = () => {
    return (
        <>
            <SearchBar />
            <SecondNavMovie />
            <Outlet />
        </>
    )
}

export default Movie