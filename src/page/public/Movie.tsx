import { Outlet } from "react-router-dom"
import SearchBar from "../../components/SearchBar"
import SecondNavMovie from "../../components/movie/SecondNavMovie"

const Movie = () => {
    return (
        <>
            <SearchBar />
            <section className=" py-20">
                <SecondNavMovie />
                <Outlet />
            </section>
        </>
    )
}

export default Movie