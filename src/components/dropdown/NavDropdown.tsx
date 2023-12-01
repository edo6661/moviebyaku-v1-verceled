/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import useWindowWidth from '../../hooks/useWindowWidth';
interface ItemType {
    subtitle: string;
    to: string;
}

interface DropdownType {
    title: string;
    items: ItemType[]
}

const NavDropdown = ({ title, items }: DropdownType) => {
    const [isOpen, setIsOpen] = useState(false)
    const windowWidth = useWindowWidth()

    const mobileWidth = windowWidth > 640

    useEffect(() => {
        setIsOpen(false)
    }, [])

    useEffect(() => {
        if (mobileWidth) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }, [windowWidth])


    const open = () => setIsOpen(true)
    const unopen = () => setIsOpen(false)

    const dropDownVars = {
        initial: {
            y: "8px",
            opacity: 0,
        }, animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: [0.12, 0, 0.39, 0]
            }

        }, exit: {
            y: "8px",
            opacity: 0,
            transition: {
                duration: 0.4,
                ease: [0.12, 0, 0.39, 0]
            }

        }
    }

    return (
        <div className='relative'
            onMouseEnter={open}
            {...(mobileWidth && { onMouseLeave: unopen })}>
            <p className={`select-none hoveredLinks ${isOpen ? ' opacity-80' : 'text-white'}`}>{title}</p>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul className={`activeDropdown`}
                        variants={dropDownVars} initial="initial" animate="animate" exit="exit">
                        {items.map((item, index) => (
                            <li key={index} className="">
                                <Link to={`${item.to}`}
                                    className=' hoveredLinks hover:opacity-80 '>{item.subtitle}</Link>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};


export default NavDropdown