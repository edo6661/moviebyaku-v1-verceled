import { useParams } from "react-router-dom"
import SecondNavMovie from "../../components/movie/SecondNavMovie"
const SearchPage = () => {
    const { keyword } = useParams()
    return (
        <>
            <SecondNavMovie />
            <section className="">
                the {keyword}
            </section>
        </>
    )
}

export default SearchPage