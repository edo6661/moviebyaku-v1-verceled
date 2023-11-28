import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { movie, people, tv } from '../helpers/navDropdown';
import useProvider from '../hooks/useProvider';
import NavDropdown from './dropdown/NavDropdown';

const Header = () => {
    const { setSearch } = useProvider()

    const handleSearch = () => setSearch(prev => !prev)


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
                    <div className='flex items-center'>
                        <button onClick={handleSearch}>{<FaSearch />}</button>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Header