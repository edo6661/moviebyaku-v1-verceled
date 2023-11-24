import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className=" bg-main py-2 mb-8 mx-auto">
            <nav className="casualWrapper">
                <div className='mx-2'>
                    <div className=" mx-auto">
                        <Link to="/">
                            <img
                                className=" h-12 object-cover"
                                src="./logo-bg-removed.png" alt="" />

                        </Link>
                    </div>
                    <div></div>
                    <div></div>

                </div>
            </nav>
        </header>
    )
}

export default Header