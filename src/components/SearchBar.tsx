import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import useProvider from "../hooks/useProvider"

const SearchBar = () => {
    const { search, handleTerm, searchTerm } = useProvider()
    const navigate = useNavigate()
    const handleSubmitTerm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        navigate(`/${searchTerm}`)
    }

    return (
        search && (
            <section className=' bg-white p-2 text-white absolute w-full'>
                <div className='casualWrapper '>
                    <form action="" className='innerSearchBar' onSubmit={handleSubmitTerm}>
                        <button><FaSearch color="#acacac" /></button>
                        <input type="text"
                            className='' placeholder='Search Movie or ...'
                            onChange={handleTerm}
                            value={searchTerm}
                        />
                    </form>
                </div>
            </section>
        )

    )
}

export default SearchBar