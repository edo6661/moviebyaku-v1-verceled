import { Link } from "react-router-dom";
import baseImageUrl, { defaultImg } from "../../utils/baseImgUrl";

const PersonCard = ({ person }: { person: PersonSearchResult }) => {

    const randomImages = defaultImg[Math.floor(Math.random() * defaultImg.length)]
    const src = person.profile_path ? baseImageUrl + person.profile_path : randomImages

    return (
        <div className='innerPopularPeople'>
            <Link to={`/person/${person.id}`}>
                <img src={src} alt={person.name}
                    className='' loading='lazy' />
            </Link>
            <div className='detailsPopularPeople'>
                <p className='font-semibold text-lg'>{person.name}</p>
                <div>
                    {person.known_for.map((k, i, a) => {
                        return (
                            <span key={k.id}
                                className='dateSingleMovie font-normal dark:text-white text-black'>
                                {(i === a.length - 1 && a.length > 1) ? ', and ' : ''}
                                {k.original_name}
                                {k.original_title}
                                {/* ! kalo dia bukan 2 element terakhir ga kasih koma, tapi kasih koma ke element pertama */}
                                {(i < a.length - 2 ? ', ' : '')}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};


export default PersonCard