import { AnimatePresence, motion } from 'framer-motion';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useProvider from "../hooks/useProvider";

const SearchBar = () => {
    const { search, handleTerm, searchTerm } = useProvider()
    const navigate = useNavigate()
    const handleSubmitTerm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        navigate(`/${searchTerm}`)
    }

    const searchBarVars = {
        initial: {
            y: "-10px",
            opacity: 0,
        },
        animate: {
            y: "0",
            transition: {
                duration: 0.3,
                ease: [0.12, 0, 0.39, 0],
            },
            opacity: 1,
        },
        exit: {
            y: "-10px",
            transition: {
                duration: 0.3,
                ease: [0.12, 0, 0.39, 0],
            },
            opacity: 0,
        },
    }

    return (
        <AnimatePresence>
            {search && (
                <motion.section className='containerSearchBar'
                    variants={searchBarVars} initial="initial" animate="animate" exit="exit">
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
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default SearchBar