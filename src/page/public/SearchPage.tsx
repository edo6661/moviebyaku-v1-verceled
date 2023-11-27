import { useParams } from "react-router-dom"
import SearchBar from "../../components/SearchBar"
const SearchPage = () => {
    const { keyword } = useParams()
    return (
        <>
            <SearchBar />
            <section>
                the {keyword}
            </section>
        </>
    )
}

export default SearchPage