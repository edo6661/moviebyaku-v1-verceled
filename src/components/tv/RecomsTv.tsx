import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import baseImageUrl from "../../utils/baseImgUrl";
import { appearedCardVars, optionVars, scrollerVars } from '../../utils/sliderVars';
import SliderMenu from '../firstSection/SliderMenu';

const RecomsTv = ({ poster_path, name, first_air_date, id }: TvRecommendationResult) => {

    const [button, setButton] = useState<Record<string, boolean>>({})

    const handleClick = (id: string) => setButton(prev => ({ ...prev, [id]: !(prev[id] || false) }))

    return (
        <>
            <motion.div className='containerRecomsSingleMovie relative'
                variants={scrollerVars}
                initial="initial"
                whileInView="animation"
                viewport={{ once: true }}
            >
                <motion.button
                    variants={optionVars}
                    initial="initial" whileHover="hover" exit="exit"
                    className=' buttonPopularDetails right-2 z-20'
                    onClick={() => handleClick(id.toString())}
                >
                    <HiOutlineDotsCircleHorizontal size={25} color="#4B0082" />
                </motion.button>
                <AnimatePresence>
                    {button[id] &&
                        <motion.div
                            className=' buttonMenuPopularDetails z-20'
                            onMouseLeave={() => handleClick(id.toString())}
                            variants={appearedCardVars}
                            animate="animation"
                            initial="initial"
                            exit="exit">
                            <SliderMenu id={id.toString()} />
                        </motion.div>}
                </AnimatePresence>
                <Link to={`/movie/${id}`} className='imgSliderMedia block w-52 '>
                    <img className="imgSliderMedia hoveredPoster" src={baseImageUrl + poster_path} alt={name} />
                </Link>
                <p className='sm:text-xl text-lg font-semibold '>{name}</p>
                <p className='sm:text-lg text-base'>{first_air_date.slice(0, 4)}</p>
            </motion.div >

        </>
    )
}

export default RecomsTv