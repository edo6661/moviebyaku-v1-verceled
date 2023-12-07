import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import baseImageUrl from '../../utils/baseImgUrl';
import { appearedCardVars, imageVars, optionVars } from '../../utils/sliderVars';
import SliderMenu from '../firstSection/SliderMenu';
import PercentageVote from '../singleMovie/PercentageVote';

interface Props {
    movie: ResultFirstSectionMovie;
    i: number;
    button: Record<string, boolean>;
    handleClick: (i: number) => void;
}

const MovieCard = ({ movie, i, button, handleClick }: Props) => {
    let percentageVote;
    if (movie.vote_average) percentageVote = Math.round(movie.vote_average * 10)
    const date = new Date(movie.release_date.split('T')[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    return (
        <div className="relative flex flex-col " key={movie.id}>
            <div className="relative flex flex-col mx-auto " key={movie.id}>
                <div className="relative w-fit " >
                    <Link className='w-full' to={`/movie/${movie.id}`}>
                        <motion.img
                            src={baseImageUrl + movie.poster_path} alt={movie.title}
                            loading='lazy'
                            variants={imageVars}
                            initial="initial"
                            animate={button[i] ? 'animation' : ''}
                            className={`imgSliderMedia hoveredPoster w-full`}
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
        </div>
    );
};

export default MovieCard;
