import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import { appearedCardVars, imageVars, optionVars, scrollerVars } from '../../utils/sliderVars';
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
}

const SliderMovies = ({ id, poster_path, title, release_date, i, backdrop_path, setActiveBackdropPath }: Props) => {

    const width = useWindowWidth()
    const [button, setButton] = useState<Record<string, boolean>>({})
    // ! Fungsi ini membalik nilai dari properti dengan kunci i dalam objek button. Jika properti tersebut belum ada dalam objek button, maka nilai defaultnya adalah false.
    const handleClick = (i: string) => setButton(prev => ({ ...prev, [i]: !(prev[i] || false) }))
    const trueBp = () => setActiveBackdropPath?.(backdrop_path)
    const imageWidth = width > 400 ? 'xlImagePopularDetails' : 'smImagePopularyDetails'
    const src = 'https://image.tmdb.org/t/p/original/'


    // const max = 2000;
    // const percentage = (popularity / max) * 100;
    // const bgColor = percentage < 25 ? 'bg-red-700' : percentage < 50 ? 'bg-red-500' :
    //     percentage < 75 ? 'bg-yellow-500' : 'bg-green-500'
    return (
        <motion.div key={id}
            variants={scrollerVars}
            initial="initial"
            whileInView="animation"
            className={`containerPopularDetails`}
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

                </Link>
                <div>
                    <motion.button
                        variants={optionVars}
                        initial="initial" whileHover="hover" exit="exit"
                        className=' buttonPopularDetails'
                        onClick={() => handleClick(i.toString())}>
                        <HiOutlineDotsCircleHorizontal size={25} color="#4B0082" />
                    </motion.button>
                    <AnimatePresence>
                        {button[i] &&
                            <motion.div
                                className=' buttonMenuPopularDetails'
                                onMouseLeave={() => handleClick(i.toString())}
                                variants={appearedCardVars}
                                animate="animation"
                                initial="initial"
                                exit="exit">
                                <SliderMenu id={id.toString()} />
                            </motion.div>}
                    </AnimatePresence>
                </div>
                {/* <div className={`percentagePopularDetails ${bgColor}
            }`} >
                    <p>{Math.round(percentage)}%</p>
                </div> */}
            </div>
            <div className="containerPopularDetails gap-2">
                <p className='title'>{title}</p>
                <p className=''>{release_date}</p>
            </div>
        </motion.div>

    )
}

export default SliderMovies