import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import baseImageUrl from "../../utils/baseImgUrl";
import { appearedCardVars, optionVars, scrollerVars } from '../../utils/sliderVars';
import SliderMenu from '../firstSection/SliderMenu';

const CastPerson = ({ poster_path, title, release_date, id, first_air_date, name, media_type }: CastCredit) => {

    const link = media_type === 'tv' ? `/tv/${id}` : `/movie/${id}`
    const date = media_type === 'tv' ? first_air_date : release_date

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
                            <SliderMenu id={id.toString()} media_type={media_type} />
                        </motion.div>}
                </AnimatePresence>
                <Link to={link} className='linkSliderMedia  '>
                    <img className="imgSliderMedia hoveredPoster " src={baseImageUrl + poster_path} alt={title} />
                </Link>
                <p className='text-lg'>{name ? name : title}</p>
                <p className='sm:text-lg text-base'>{date}</p>
            </motion.div >

        </>
    )
}

export default CastPerson