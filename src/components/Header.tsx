import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className=" bg-main py-2 mb-8">
            <nav className=" max-w-7xl mx-auto">
                <div className=" justify-self-start">
                    <Link to="/">
                        <img
                            className=" h-12 object-cover"
                            src="./logo-bg-removed.png" alt="" />

                    </Link>
                </div>
                <div></div>
                <div></div>
            </nav>
        </header>
    )
}

export default Header