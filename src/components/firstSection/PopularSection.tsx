import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { usePopularMoviesQuery } from '../../features/movie/movieApiSlice';
import { usePopularTvQuery } from '../../features/tv/tvApiSlice';
import useWindowWidth from '../../hooks/useWindowWidth';
import ErrorMessage from '../errAndLoading/TemporaryError';
import SliderMovies from './SliderMovies';
import SliderTv from './SliderTv';

const PopularSection = () => {

    const width = useWindowWidth()
    const [day, setDay] = useState(false)
    const [activeBackdropPath, setActiveBackdropPath] = useState('');

    const { data: moviesData, isError: isErrDay, error: errDay } = usePopularMoviesQuery(1)
    const { data: tvData, isError: isErrWeek, error: errWeek } = usePopularTvQuery(1)


    const dayTrue = day && 'textGradient cursor-pointer'
    const dayFalse = !day && 'textGradient cursor-pointer'
    const errMsgDay = isErrDay && errDay && <ErrorMessage error={errDay} />
    const errMsgWeek = isErrWeek && errWeek && <ErrorMessage error={errWeek} />

    const leftVars = {
        initial: {
            x: '0',
        }, animate: {
            x: '76%',
            transition: {
                duration: 0.2,
                ease: [0.12, 0, 0.39, 0]
            }
        }
    }
    const rightVars = {
        initial: {
            x: '0',
        }, animate: {
            x: '-2%',
            transition: {
                duration: 0.2,
                ease: [0.12, 0, 0.39, 0]
            }
        }
    }

    const bgVars = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0]
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0]
            },
        },
    }

    const smBg = width < 700 && 'dark:bgDarkGradient bgLightGradient'

    const containerDay = day && 'hidden'
    const containerWeek = !day && 'hidden'

    const bgWeek = day ? 'rounded-r-xl w-[60px]' : 'rounded-l-xl w-[46px]'

    const toggleDayTrue = () => setDay(true)
    const toggleDayFalse = () => setDay(false)

    const movieElement = (
        <div className={`${containerWeek} containerPopularMovies`}
            style={{ willChange: 'transform, opacity' }}
        >
            {moviesData?.results.map((movie, i: number) =>
                <SliderMovies key={movie.id} {...movie} i={i} setActiveBackdropPath={setActiveBackdropPath} />
            )}
        </div>
    )
    const tvElement = (
        <div className={`${containerDay} containerPopularMovies `}
            style={{ willChange: 'transform, opacity' }}
        >
            {tvData?.results.map((tv, i: number) =>
                <SliderTv key={tv.id} {...tv} i={i} setActiveBackdropPath={setActiveBackdropPath} />
            )}
        </div>
    )

    return (
        <section
            className="py-4 relative">
            <AnimatePresence>
                <motion.div className={`absolute inset-0 bgUrlSlider -z-10 ${smBg}`}
                    variants={bgVars}
                    initial="initial"
                    exit="exit"
                    key={activeBackdropPath}
                    animate="animate"
                    style={{ backgroundImage: width >= 700 ? `url(https://image.tmdb.org/t/p/original/${activeBackdropPath})` : undefined }}>
                </motion.div>
            </AnimatePresence>
            <div className='containerPopularDetails casualWrapper'>
                <h1 className='font-semibold text-xl'>Popular</h1>
                <div className='containerDay'>
                    <p onClick={toggleDayFalse} className={` ${dayTrue}`}>Tv
                    </p>
                    <motion.div variants={day ? leftVars : rightVars} animate='animate' initial="initial" className={`bgDay ${bgWeek}`}></motion.div>
                    <p onClick={toggleDayTrue} className={` ${dayFalse}`}>Movie
                    </p>
                </div>
                <article>
                    {errMsgDay}
                    {errMsgWeek}
                </article>
                <article className="containerPopularMovies " >
                    <AnimatePresence>
                        {tvElement}
                    </AnimatePresence>
                    <AnimatePresence>
                        {movieElement}
                    </AnimatePresence>
                </article>
            </div>
        </section>
    )
}

export default PopularSection