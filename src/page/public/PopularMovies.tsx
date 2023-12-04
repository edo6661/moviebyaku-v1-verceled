import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import ErrorMessage from "../../components/errAndLoading/TemporaryError";
import SliderMenu from '../../components/firstSection/SliderMenu';
import PercentageVote from '../../components/singleMovie/PercentageVote';
import { usePopularMoviesQuery } from "../../features/movie/movieApiSlice";
import baseImageUrl from '../../utils/baseImgUrl';
import { appearedCardVars, imageVars, optionVars } from '../../utils/sliderVars';

const PopularMovies = () => {
    const [page, setPage] = useState(1)
    const [button, setButton] = useState<Record<string, boolean>>({})
    const [allMovies, setAllMovies] = useState<ResultFirstSectionMovie[]>([])
    const { data, isError, error, isLoading } = usePopularMoviesQuery(page);

    const errMsg = error && isError && <ErrorMessage error={error} />

    useEffect(() => {
        if (data?.results) {
            setAllMovies(prev => [...prev, ...data.results])
        }
    }, [data])

    const nextPage = () => setPage(prev => prev + 1)
    const handleClick = (i: number) => setButton(prev => ({ ...prev, [i]: !(prev[i] || false) }))


    return (
        <section className="mt-[4.5rem]">
            <article className="casualWrapper my-6">
                <h1 className="font-bold mb-4 text-2xl">Popular Movies</h1>
                {errMsg}
                <div className="grid grid-cols-3 gap-6">
                    <div className="flex flex-col gap-8">
                        <div className="">
                            <div className='flex justify-between w-full shadowCard flex-1 text-start px-5 py-4 rounded-xl text-xl font-semibold cursor-pointer'>
                                <button className=''>Sort</button>
                                <span>+</span>
                            </div>
                        </div>
                        <div className=''>
                            <div className='flex justify-between w-full shadowCard flex-1 text-start px-5 py-4 rounded-xl text-xl font-semibold cursor-pointer'>
                                <button className=''>Genres</button>
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                    <div className=" col-span-2  grid-cols-links-auto-fit grid gap-x-3 gap-y-6">
                        {data?.results ? allMovies.map((movie, i) => {
                            let percentageVote;

                            if (movie.vote_average) percentageVote = Math.round(movie.vote_average * 10)

                            const date = new Date(movie.release_date.split('T')[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                            return (
                                <div className="relative flex flex-col" key={movie.id}>
                                    <div className="relative w-fit">
                                        <Link className='rounded-xl' to={`/movie/${movie.id}/main`}>
                                            <motion.img
                                                src={baseImageUrl + movie.poster_path} alt={movie.title}
                                                loading='lazy'
                                                variants={imageVars}
                                                initial="initial"
                                                animate={button[i] ? 'animation' : ''}
                                                className={`rounded-t-xl imagePopularDetails h-80`}
                                            />
                                        </Link>
                                        <div>
                                            <motion.button
                                                variants={optionVars}
                                                initial="initial" whileHover="hover" exit="exit"
                                                className=' buttonPopularDetails'
                                                onClick={() => handleClick(i)}>
                                                <HiOutlineDotsCircleHorizontal size={25} color="#4B0082" />
                                            </motion.button>
                                            <AnimatePresence>
                                                {button[i] &&
                                                    <motion.div
                                                        className=' buttonMenuPopularDetails'
                                                        onMouseLeave={() => handleClick(i)}
                                                        variants={appearedCardVars}
                                                        animate="animation"
                                                        initial="initial"
                                                        exit="exit">
                                                        <SliderMenu id={movie.id.toString()} />
                                                    </motion.div>}
                                            </AnimatePresence>
                                        </div>
                                        <motion.div className='absolute -bottom-6 left-0'
                                            variants={imageVars}
                                            initial="initial"
                                            animate={button[i] ? 'animation' : ''}
                                        >
                                            <PercentageVote percentageVote={percentageVote ?? 0} />
                                        </motion.div>
                                    </div>
                                    <div className="mt-6 flex flex-col gap-1">
                                        <p className="font-semibold">{movie.title}</p>
                                        <p className="fadeWord">{date}</p>
                                    </div>
                                </div>
                            )
                        }) : !isLoading && <h2 className='text-3xl font-bold text-center'>No Alter Title</h2>}
                        {!isLoading && allMovies.length ? (
                            <button className=" col-span-full bg-darkBlue rounded-xl p-3"
                                onClick={nextPage}>
                                Show more
                            </button>

                        ) : ''}
                    </div>
                </div>
            </article>
        </section>
    )
}

export default PopularMovies