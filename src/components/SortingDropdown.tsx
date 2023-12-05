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
}

const SortingDropdown = ({ svg, dropdown, handleSvg, handleDropdown, title, stuff }: Props) => {

    const svgStyle = svg ? 'rotate-0' : 'rotate-90'
    const svgAnimate = svg ? 'animate' : ''

    return (
        <AnimatePresence>
            <motion.div className='containerSorting'
                variants={btnVars} initial="initial" animate={svg && !dropdown ? 'animate' : dropdown ? 'dropdown' : ''} exit="exit">
                <div className='innerSorting' onClick={handleSvg}>
                    <button className='' >{title}</button>
                    <div className='flex relative '>
                        <div className='iconSorting'><FaMinus size={25} color={svg ? '#1F4699' : ''} /></div>
                        <div className={`iconSorting  ${svgStyle} `}><FaMinus color={svg ? '#1F4699' : ''} size={25} /></div>
                    </div>
                </div>
                <AnimatePresence>
                    {svg && (
                        <motion.div variants={contentVars} initial="initial" animate={svgAnimate} exit="exit"
                            className='detailsSorting'>
                            <button className='buttonKeywordMovie' onClick={handleDropdown}>Popularity Desc</button>
                            {dropdown && (
                                <motion.ul
                                    variants={contentVars} initial="initial" animate={svgAnimate} exit="exit"
                                    className='text-base font-light shadowCard px-3 rounded-xl'>
                                    {stuff.map(s =>
                                        <motion.li
                                            variants={contentVars} initial="initial" animate={svgAnimate} exit="exit"
                                            className=' '>{s}</motion.li>
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