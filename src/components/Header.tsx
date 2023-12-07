/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from 'react-router-dom';
import { movie, people, tv } from '../helpers/navDropdown';
import useMenuAnimation from '../hooks/useMenuAnimation';
import useProvider from '../hooks/useProvider';
import useWindowWidth from '../hooks/useWindowWidth';
import { containerMobile, smRotateVars } from '../locale/HeaderVars';
import SearchBar from './SearchBar';
import NavDropdown from './dropdown/NavDropdown';

const Header = () => {
    const [open, setOpen] = useState(false)
    const width = useWindowWidth()
    const { setSearch } = useProvider()
    const location = useLocation()
    const handleSearch = () => setSearch(prev => !prev)
    const scope = useMenuAnimation(open);

    const mobileWidth = width > 640

    useEffect(() => {
        setSearch(false)
    }, [location.pathname])

    useEffect(() => {
        if (mobileWidth) setOpen(false)
    }, [width])

    const dropdown = <motion.div className='flex gap-4'>
        <NavDropdown title='Movie' items={movie} />
        <NavDropdown title='Shows' items={tv} />
        <NavDropdown title='People' items={people} />
    </motion.div>

    const img = <Link to="/">
        <img
            className=" h-12 object-cover"
            src="/logo.png" alt="Logo"
        />
    </Link>


    const toggle = () => setOpen(prev => !prev)
    const closeToggle = () => setOpen(false)

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Element;
        if (target.className !== 'containerMobileNav') {
            closeToggle()
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => window.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        < header className=' fixed w-full z-50 ' ref={scope} >
            <nav className="casualWrapper mx-auto ">
                {mobileWidth ? (
                    <div className='headerContainer '>
                        <div className="headerInner">
                            {img}
                            {dropdown}
                        </div>
                        <div className='flex items-center gap-4'>
                            <button onClick={handleSearch}
                            >{<FaSearch size={21} />}</button>
                        </div>
                    </div>

                ) : (
                    <div className='headerContainer '>
                        <div className="headerInner">
                            {img}
                        </div>
                        <div className='flex items-center gap-4'>
                            <button onClick={handleSearch}>{<FaSearch size={21} />}</button>
                            <motion.button onClick={(e) => {
                                e.stopPropagation();
                                toggle()
                            }}
                                variants={smRotateVars}
                                animate={open ? 'open' : 'close'}
                            >
                                <GiHamburgerMenu size={24} />
                            </motion.button>
                        </div>
                    </div>
                )}
            </nav>
            <AnimatePresence>
                <motion.ul className={`containerMobileNav`}
                    variants={containerMobile}
                    initial="initial"
                    animate={open ? 'open' : ''}
                    exit="exit">
                    <motion.li>
                        <NavDropdown title='Movie' items={movie} />
                    </motion.li>
                    <motion.li>
                        <NavDropdown title='Shows' items={tv} />
                    </motion.li>
                    <motion.li>
                        <NavDropdown title='People' items={people} />
                    </motion.li>
                </motion.ul>
            </AnimatePresence>
            <SearchBar />
        </header >
    )
}

export default Header