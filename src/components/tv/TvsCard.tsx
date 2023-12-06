import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import baseImageUrl from '../../utils/baseImgUrl';
import { appearedCardVars, imageVars, optionVars } from '../../utils/sliderVars';
import PercentageVote from '../singleMovie/PercentageVote';
import TvSliderMenu from './TvSliderMenu';

interface Props {
    tv: PopularTv;
    i: number;
    button: Record<string, boolean>;
    handleClick: (i: number) => void;
}

const TvsCard = ({ tv, i, button, handleClick }: Props) => {
    let percentageVote;
    if (tv.vote_average) percentageVote = Math.round(tv.vote_average * 10)
    const date = new Date(tv.first_air_date.split('T')[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    return (
        <div className="relative flex flex-col" key={tv.id}>
            <div className="relative flex flex-col" key={tv.id}>
                <div className="relative w-fit">
                    <Link className='rounded-xl' to={`/tv/${tv.id}`}>
                        <motion.img
                            src={baseImageUrl + tv.poster_path} alt={tv.name}
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
                                    <TvSliderMenu id={tv.id.toString()} />
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
                    <p className="font-semibold">{tv.name}</p>
                    <p className="fadeWord">{date}</p>
                </div>
            </div>
        </div>
    );
};

export default TvsCard;
