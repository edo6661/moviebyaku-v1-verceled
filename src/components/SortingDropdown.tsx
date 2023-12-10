import { AnimatePresence, motion } from 'framer-motion';
import { FaMinus } from 'react-icons/fa';
import { btnVars, contentVars } from '../utils/SortDropdownVars';

interface Props {
    svg: boolean;
    dropdown: boolean;
    handleSvg: () => void;
    handleDropdown: () => void;
    stuff: string[];
    title: string;
    sort?: string;
    handleSort: (s: string) => void;
}

const SortingDropdown = ({ svg, dropdown, handleSvg, handleDropdown, title, stuff, sort, handleSort }: Props) => {

    const svgStyle = svg ? 'rotate-0' : 'rotate-90'
    const svgAnimate = svg ? 'animate' : ''

    const extractedSort = sort ? sort === 'popularity.desc' ? 'Popularity Desc' : 'Vote Count Desc' : ''

    return (
        <AnimatePresence>
            <motion.div className='containerSorting'
                variants={btnVars} initial="initial" animate={svg && !dropdown ? 'animate' : dropdown ? 'dropdown' : ''} exit="exit">
                <div className='innerSorting  justify-between' onClick={handleSvg}>
                    <button className='' >{title}</button>
                    <div className='flex relative w-fit '>
                        <div className='iconSorting'><FaMinus size={25} color={svg ? '#1F4699' : ''} /></div>
                        <div className={`iconSorting  ${svgStyle} `}><FaMinus color={svg ? '#1F4699' : ''} size={25} /></div>
                    </div>
                </div>
                <AnimatePresence>
                    {svg && (
                        <motion.div variants={contentVars} initial="initial" animate={svgAnimate} exit="exit"
                            className='detailsSorting  '>
                            <button className='font-semibold border-bCard border-2 border-opacity-20 px-2 py-1 rounded-xl' onClick={handleDropdown}>{extractedSort}</button>
                            {dropdown && (
                                <motion.ul
                                    variants={contentVars} initial="initial" animate={svgAnimate} exit="exit"
                                    className='text-base dateSingleMovie px-3 rounded-xl text-black dark:text-white h-full'>
                                    {stuff.map(s =>
                                        <motion.li
                                            variants={contentVars} initial="initial" animate={svgAnimate} exit="exit"
                                            key={s}>
                                            <button onClick={() => handleSort?.(s)}
                                                className={`${s === sort ? 'textGradient cursor-default' : ''}`}>
                                                {s === 'popularity.desc' ? 'Popularity Desc' : 'Vote Count Desc'}
                                            </button>
                                        </motion.li>
                                    )}
                                </motion.ul>

                            )}
                        </motion.div>

                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>

    )
}

export default SortingDropdown