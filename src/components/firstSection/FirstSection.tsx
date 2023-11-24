import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTrendingMoviesDayQuery, useTrendingMoviesWeekQuery } from '../../features/movie/movieApiSlice';
import ErrorMessage from '../errAndLoading/TemporaryError';
import SliderMovies from './SliderMovies';


const FirstSection = () => {

    const { data: dayData, isError: isErrDay, error: errDay } = useTrendingMoviesDayQuery(1)
    const { data: weekData, isError: isErrWeek, error: errWeek } = useTrendingMoviesWeekQuery(1)

    const [day, setDay] = useState(false)

    const dayTrue = day && 'textGradient cursor-pointer'
    const dayFalse = !day && 'textGradient cursor-pointer'
    const errMsgDay = isErrDay && errDay && <ErrorMessage error={errDay} />
    const errMsgWeek = isErrWeek && errWeek && <ErrorMessage error={errWeek} />

    const leftVars = {
        initial: {
            x: '0',
        }, animate: {
            x: '87%',
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

    const containerDay = day && 'hidden'
    const containerWeek = !day && 'hidden'

    const bgWeek = day ? 'rounded-r-xl w-[60px]' : 'rounded-l-xl w-[54px]'

    const toggleDayTrue = () => setDay(true)
    const toggleDayFalse = () => setDay(false)


    console.log(dayData)
    const dayElement = (
        <div className={`${containerDay} containerPopularMovies will-change-transform`}>
            {dayData?.results.map((movie, i: number) =>
                <SliderMovies key={movie.id} {...movie} i={i} />
            )}
        </div>
    )
    const weekElement = (
        <div className={`${containerWeek} containerPopularMovies will-change-transform`}>
            {weekData?.results.map((movie, i: number) =>
                <SliderMovies key={movie.id} {...movie} i={i} />
            )}
        </div>
    )

    return (
        <section className="containerPopularDetails ">
            <h1 className='font-semibold text-xl'>Trending</h1>
            <div className='containerDay'>
                <p onClick={toggleDayFalse} className={` ${dayTrue}`}>Day
                </p>
                <motion.div variants={day ? leftVars : rightVars} animate='animate' initial="initial" className={`bgDay ${bgWeek}`}></motion.div>
                <p onClick={toggleDayTrue} className={` ${dayFalse}`}>Week
                </p>
            </div>
            <article>
                {errMsgDay}
                {errMsgWeek}
            </article>
            <article className="containerPopularMovies will-change-transform " >
                <AnimatePresence>
                    {dayElement}
                </AnimatePresence>
                <AnimatePresence>
                    {weekElement}
                </AnimatePresence>
            </article>
        </section>
    )
}

export default FirstSection