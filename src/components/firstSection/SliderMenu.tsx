import { FaBookmark, FaHeart, FaList, FaStar } from 'react-icons/fa';

const SliderMenu = () => {

    const menus = [
        {
            title: 'Add to list',
            icons: <FaList size={15} />
        },
        {
            title: 'Favorite',
            icons: <FaHeart size={15} />
        },
        {
            title: 'Watch list',
            icons: <FaBookmark size={15} />
        },
        {
            title: 'Your Rating',
            icons: <FaStar size={15} />
        },
    ]

    return menus.map((menu, i) =>
        <button className='menuPopularMovies' key={i}>
            <span className='iconPopularMovies'>
                {menu.icons}
            </span>
            <span className='ml-2'>
                {menu.title}
            </span>
        </button>
    )
}

export default SliderMenu
