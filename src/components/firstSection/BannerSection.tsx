import { FaSearch } from 'react-icons/fa';

const BannerSection = () => {
    return (
        <section className="bannerSection flex justify-center items-center ">
            <div className="casualWrapper ">
                <form
                    className='text-xl text-transparent flex items-center justify-end gap-4'>
                    <input
                        className=" bg-transparent outline-2 outline-white border-white lg:w-96  border h-12 rounded-xl py-2 px-6 text-white text-2xl placeholder:text-white placeholder:italic"
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