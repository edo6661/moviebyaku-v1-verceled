import { FaGithubAlt } from "react-icons/fa"

const Footer = () => {

    const scrolltoTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer>
            <div className="casualWrapper text-2xl flex justify-between">
                <button onClick={scrolltoTop}>Scroll to Top</button>
                <a className="relative flex items-center" target="_blank" href="https://github.com/edo6661/animebyaku-v1">
                    <span className=" text-pinky mr-1">&copy; </span>
                    Halo Mamaah
                    <span className="absolute -right-8"><FaGithubAlt /></span>
                </a>
            </div>
        </footer>
    )
}

export default Footer