import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { movie, people, tv } from '../helpers/navDropdown';
import useProvider from '../hooks/useProvider';
import NavDropdown from './dropdown/NavDropdown';



const Header = () => {
    const { setSearch } = useProvider()
    const location = useLocation()
    const handleSearch = () => setSearch(prev => !prev)
    useEffect(() => {
        setSearch(false)
    }, [location.pathname])

    return (
        < header >
            <nav className="casualWrapper mx-auto">
                <div className='headerContainer '>
                    <div className="headerInner">
                        <Link to="/">
                            <img
                                className=" h-12 object-cover"
                                src="/logo.png" alt="Logo"
                            />
                        </Link>
                        <motion.div className='flex gap-4'>
                            <NavDropdown title='Movie' items={movie} />
                            <NavDropdown title='Shows' items={tv} />
                            <NavDropdown title='People' items={people} />
                        </motion.div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <button onClick={handleSearch}>{<FaSearch size={21} />}</button>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Header