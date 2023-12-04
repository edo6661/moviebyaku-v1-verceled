
const Footer = () => {

    const scrolltoTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer>
            <div className="casualWrapper">
                <button onClick={scrolltoTop}>Scroll to Top</button>
            </div>
        </footer>
    )
}

export default Footer