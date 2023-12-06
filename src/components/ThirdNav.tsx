import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import baseImageUrl from "../utils/baseImgUrl";

interface Props {
    poster_path?: string;
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
    isLoading: boolean;
    backdrop_path?: string;
}

const ThirdNav = ({ poster_path, title, name, release_date, first_air_date, isLoading, backdrop_path }: Props) => {

    const location = useLocation();

    const personPath = location.pathname.includes('person');
    return (
        <section className={`${personPath && 'bg-lightBlue dark:bg-darkBlue'} containerThirdNavMovie`}
            style={{ backgroundImage: `url(${baseImageUrl}/${backdrop_path})` }
            }>
            {!isLoading && (
                <div >
                    <div>
                        <img className=" w-24 rounded-xl" src={baseImageUrl + poster_path} alt={title || name} />
                    </div>
                    <div className="innerThirdNavMovie">
                        <h1 className='text-white' >{title || name}
                            {!personPath && <span >({release_date ? release_date.substring(0, 4) : first_air_date?.substring(0, 4)})</span>}
                        </h1>
                        <Link to="main">
                            <span>{<FaArrowLeft size={18} />}</span>
                            <span>Back to Main</span>
                        </Link>
                    </div>
                </div>
            )}
        </section >
    )
}

export default ThirdNav