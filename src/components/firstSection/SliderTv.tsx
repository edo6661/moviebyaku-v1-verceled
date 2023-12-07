/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import { appearedCardVars, imageVars, optionVars, scrollerVars } from '../../utils/sliderVars';
import PercentageVote from '../singleMovie/PercentageVote';
import SliderMenu from './SliderMenu';

interface Props {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
    i: number;
    setActiveBackdropPath: React.Dispatch<React.SetStateAction<string>>;
}

const SliderTv = ({ id, poster_path, name, first_air_date, i, backdrop_path, setActiveBackdropPath, vote_average }: Props) => {
    const [button, setButton] = useState<Record<string, boolean>>({})
    let percentageVote;
    if (vote_average) percentageVote = Math.round(vote_average * 10)

    const width = useWindowWidth()
    const handleClick = (i: string) => setButton(prev => ({ ...prev, [i]: !(prev[i] || false) }))
    const falseOption = (i: string) => setButton(prev => ({ ...prev, [i]: false }))
    const trueOption = (i: string) => setButton(prev => ({ ...prev, [i]: true }))
    const imageWidth = width > 400 ? 'xlImagePopularDetails' : 'smImagePopularyDetails'
    const src = 'https://image.tmdb.org/t/p/original/'

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Element
        if (target.className !== 'buttonMenuPopularDetails') {
            falseOption(i.toString())
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside)
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
                <Link to={`tv/${id}`}>
                    <motion.img
                        onMouseOver={() => setActiveBackdropPath(backdrop_path)}
                        loading='lazy'
                        variants={imageVars}
                        initial="initial"
                        animate={button[i] ? 'animation' : ''}
                        className={`${imageWidth} imagePopularDetails`}
                        src={`${src}${poster_path}`} alt={name} />
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
                                    handleClick(i.toString())
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    trueOption(i.toString())
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
                <p className='title'>{name}</p>
                <p className=''>{first_air_date}</p>
            </div>
        </motion.div>

    )
}

export default SliderTv