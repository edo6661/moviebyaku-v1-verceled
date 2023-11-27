import { FaSearch } from 'react-icons/fa';

const BannerSection = () => {
    return (
        <section className="bannerSection ">
            <div className="casualWrapper ">
                <form
                    className='innerBanner'>
                    <input
                        type="text"
                        placeholder='Search...' />
                    <button className='absolute z-10 mr-2'>
                        <FaSearch color="white" size={25} />
                    </button>
                </form>
            </div>
        </section>
    )
}

export default BannerSection