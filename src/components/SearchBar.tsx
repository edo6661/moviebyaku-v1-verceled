import { AnimatePresence, motion } from 'framer-motion';
import { FaRegStar, FaSearch } from "react-icons/fa";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { TbMovie } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useSearchMultiQuery } from '../features/search/searchApiSlice';
import useProvider from "../hooks/useProvider";
import searchBarVars from '../locale/searchBarVars';


const SearchBar = () => {
    const { search, handleTerm, searchTerm } = useProvider()
    const navigate = useNavigate()
    const handleSubmitTerm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        navigate(`/${searchTerm}`)
    }

    const { data, isError, error } = useSearchMultiQuery({ query: searchTerm, page: '1' })
    if (isError) console.log(error)
    const activated = searchTerm !== ''

    const activatedVars = {
        initial: {
            opacity: 0,
            y: '-50px',
        }, animate: {
            opacity: .9,
            y: '0',
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0]
            },

        }, exit: {
            opacity: 0,
            y: '-50px',
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0]
            },

        }
    }

    // ! terakhir
    return (
        <AnimatePresence>
            {search && (
                <motion.section className='containerSearchBar z-50 bg-opacity-90 bg-myWhite'
                    variants={searchBarVars} initial="initial" animate="animate" exit="exit">
                    <div className='casualWrapper flex flex-col gap-2 '>
                        <form action="" className='innerSearchBar' onSubmit={handleSubmitTerm}>
                            <button><FaSearch color="#acacac" /></button>
                            <input type="text"
                                className='' placeholder='Search Movie or ...'
                                onChange={handleTerm}
                                value={searchTerm}
                            />
                        </form>
                        {activated && (
                            <AnimatePresence>
                                <motion.div className=' text-black z-20 opacity-90' variants={activatedVars}
                                    initial="initial" animate={activated ? 'animate' : ''} exit="exit">
                                    {data?.results.slice(0, 15).map((movie) => {
                                        const tv = movie.media_type === 'tv'
                                        const media = tv ? <PiTelevisionSimpleBold size={20} /> : <TbMovie size={20} />
                                        const title = tv ? movie.name : movie.title;
                                        const release = movie.release_date;
                                        const firstAir = movie.first_air_date;
                                        const vote = movie.vote_average;
                                        const url = tv ? `/tv/${movie.id}` : `/movie/${movie.id}`
                                        return (
                                            <div
                                                key={movie.id}
                                                className="  flex items-center gap-3 py-[2px] border-b-bInput border-opacity-20 border-solid border-b-2">
                                                <span>{media}</span>
                                                <a href={url} className="flex gap-1 hover:opacity-60 transition-all duration-150 justify-between w-full">
                                                    <div className="flex gap-1">
                                                        <p> {title ? title : 'empty from api'}</p>
                                                        <p>{release && `(${release.substring(0, 4)})`}</p>
                                                        <p>{firstAir && `(${firstAir.substring(0, 4)})`}</p>
                                                    </div>
                                                    <div className="flex items-center ml-4 gap-2">
                                                        {vote ? (
                                                            <>
                                                                <p><FaRegStar /></p>
                                                                <p>{Number(vote).toFixed(1)}</p>
                                                            </>
                                                        ) : <p>empty</p>}
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                </motion.section>
            )
            }
        </AnimatePresence >
    )
}

export default SearchBar