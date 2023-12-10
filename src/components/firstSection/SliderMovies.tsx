/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import { appearedCardVars, imageVars, optionVars, scrollerVars } from '../../utils/sliderVars';
import PercentageVote from '../singleMovie/PercentageVote';
import SliderMenu from './SliderMenu';

interface Props {
    id: number;
    popularity?: number;
    poster_path: string;
    release_date: string;
    title: string;
    i: number;
    backdrop_path: string;
    setActiveBackdropPath?: React.Dispatch<React.SetStateAction<string>>;
    vote_average: number;
}

const SliderMovies = ({ id, poster_path, title, release_date, i, backdrop_path, setActiveBackdropPath, vote_average }: Props) => {
    const width = useWindowWidth()
    const [button, setButton] = useState<Record<string, boolean>>({})
    // ! Fungsi ini membalik nilai dari properti dengan kunci i dalam objek button. Jika properti tersebut belum ada dalam objek button, maka nilai defaultnya adalah false.
    const handleClick = (i: string) => setButton(prev => ({ ...prev, [i]: !(prev[i] || false) }))
    const falseOptions = (i: string) => setButton(prev => ({ ...prev, [i]: false }))
    const trueOptions = (i: string) => setButton(prev => ({ ...prev, [i]: true }))


    const trueBp = () => setActiveBackdropPath?.(backdrop_path)
    const imageWidth = width > 400 ? 'xlImagePopularDetails' : 'smImagePopularyDetails'
    const src = 'https://image.tmdb.org/t/p/original/'

    let percentageVote;

    if (vote_average) percentageVote = Math.round(vote_average * 10)

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Element
        if (target.className !== 'buttonMenuPopularDetails') {
            falseOptions(i.toString())
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <motion.div key={id}
            variants={scrollerVars}
            initial="initial"
            whileInView="animation"
            className={`containerPopularDetails`}
            viewport={{ once: true }}
        >
            <div className="relative">
                <Link to={`movie/${id}`}>
                    <motion.img
                        loading='lazy'
                        onMouseOver={trueBp}
                        variants={imageVars}
                        initial="initial"
                        animate={button[i] ? 'animation' : ''}
                        className={`${imageWidth} imagePopularDetails`}
                        src={`${src}${poster_path}`} alt={title}
                    />
                    <motion.div className='absolute -bottom-6 left-0'>
                        <PercentageVote percentageVote={percentageVote ?? 0} />
                    </motion.div>

                </Link>
                <div>
                    <motion.button
                        variants={optionVars}
                        initial="initial" whileHover="hover" exit="exit"
                        className=' buttonPopularDetails'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(i.toString())
                        }}>
                        <HiOutlineDotsCircleHorizontal size={25} color="#4B0082" />
                    </motion.button>
                    <AnimatePresence>
                        {button[i] &&
                            <motion.div
                                className=' buttonMenuPopularDetails'
                                onMouseLeave={(e) => {
                                    e.stopPropagation();
                                    falseOptions(i.toString())
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    trueOptions(i.toString())
                                }}
                                variants={appearedCardVars}
                                animate="animation"
                                initial="initial"
                                exit="exit">
                                <SliderMenu id={id.toString()} />
                            </motion.div>}
                    </AnimatePresence>
                </div>
            </div>
            <div className="containerPopularDetails gap-2">
                <p className='title'>{title.length > 24 ? title.slice(0, 24) + '...' : title}</p>
                <p className=''>{release_date}</p>
            </div>
        </motion.div >

    )
}

export default SliderMovies