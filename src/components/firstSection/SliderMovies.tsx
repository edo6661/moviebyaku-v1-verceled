import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';
import SliderMenu from './SliderMenu';

interface Props {
    id: number;
    popularity?: number;
    poster_path: string;
    release_date: string;
    title: string;
    i: number
}

const SliderMovies = ({ id, poster_path, title, release_date, i }: Props) => {
    const [button, setButton] = useState<Record<string, boolean>>({})


    const scrollerVars = {
        initial: {
            opacity: 0.3,
            display: 'hidden',
        },
        animation: {
            opacity: 1,
            display: 'flex',
            transition: {
                delay: 0.1,
                duration: 0.3,
                ease: [0.12, 0, 0.39, 0]
            }
        },
        exit: {
            display: 'hidden',
            opacity: 0,
            duration: 0.3,
            delay: 0.1,
            ease: [0.12, 0, 0.39, 0]
        }
    }
    const optionVars = {
        initial: {
            scale: 0.9,
            opacity: 0.8,
            backgroundColor: '#DFE8F1'
        },
        hover: {
            transition: {
                duration: 0.2,
                ease: [0.12, 0, 0.39, 0]
            },
            opacity: 1,
            scale: 1,
        },
        exit: {
            transition: {
                duration: 0.2,
                ease: [0.12, 0, 0.39, 0]
            },
            opacity: 1,
            scale: 0.8
        }
    }
    const imageVars = {
        initial: {
            filter: "blur(0px)",
            // opacity: 1,
        }, animation: {
            filter: "blur(4px)",
            transition: {
                duration: 0.1,
                ease: [0.12, 0, 0.39, 0]
            }
            // opacity: 0.3,
        }, exit: {
            filter: "blur(0px)",
            transition: {
                duration: 0.1,
                ease: [0.12, 0, 0.39, 0]
            }
            // opacity: 1,
        }
    }
    const appearedCardVars = {
        initial: {
            opacity: 0,
            height: 0,
            width: 0,
        }, animation: {
            opacity: 1,
            height: 'auto',
            width: 'auto',
            transition: {
                delay: 0.1,
                duration: 0.2,
                ease: [0.12, 0, 0.39, 0]
            }
        }, exit: {
            delay: 0.1,
            opacity: 0,
            height: 0,
            width: 0,
            transition: {
                duration: 0.2,
                ease: [0.12, 0, 0.39, 0]
            }
        }
    }

    const width = useWindowWidth()
    const imageWidth = width > 400 ? 'xlImagePopularDetails' : 'smImagePopularyDetails'
    const handleClick = (i: string) => setButton(prev => ({ ...prev, [i]: !(prev[i] || false) }))

    // const max = 2000;
    // const percentage = (popularity / max) * 100;
    // const bgColor = percentage < 25 ? 'bg-red-700' : percentage < 50 ? 'bg-red-500' :
    //     percentage < 75 ? 'bg-yellow-500' : 'bg-green-500'
    return (
        <motion.div key={id}
            variants={scrollerVars}
            initial="initial"
            whileInView="animation"
            className={`containerPopularDetails`}>
            <div className="relative">
                <Link to={`movie/${id}`}>
                    <motion.img
                        variants={imageVars}
                        initial="initial"
                        animate={button[i] ? 'animation' : ''}
                        className={`${imageWidth} imagePopularDetails opacity-100 hover:opacity-60 transition-all duration-300`}
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={title} />
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
                                <SliderMenu />
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