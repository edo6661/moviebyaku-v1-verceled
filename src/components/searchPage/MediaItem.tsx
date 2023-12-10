import { Link } from "react-router-dom";
import baseImageUrl, { defaultImg } from "../../utils/baseImgUrl";

const MediaItem = ({ media }: { media: ResultMulti | MovieSearchResult | TvSearchResult }) => {
    const airDate = media.first_air_date && new Date(media.first_air_date.split('T')[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const releaseDate = media.release_date && new Date(media.release_date.split('T')[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const person = media.media_type === 'person'
    const to = media.media_type === 'tv' ? 'tv' : media.media_type === 'movie' ? 'movie' : 'person';

    const title = media.title && media.title.length > 61 ? media.title.slice(0, 61) + '...' : media.title;
    const name = media.name && media.name.length > 61 ? media.name.slice(0, 61) + '...' : media.name;

    const randomImg =
        defaultImg[Math.floor(Math.random() * defaultImg.length)];

    let imgSrc;
    if (person) {
        imgSrc = media.profile_path ? baseImageUrl + media.profile_path : randomImg;
    } else {
        imgSrc = media.poster_path ? baseImageUrl + media.poster_path : randomImg;
    }

    const overview = !person ? media.overview ? media.overview.length > 50 ? media.overview.slice(0, 50) + '...' : media.overview : 'No Overview' : media.known_for_department

    const styleText = 'dark:text-white text-black'


    return (
        <div key={media.id} className=" innerDetailsSearchPage">
            <Link className="h-full" to={`/${to}/${media.id}`}>
                <img src={imgSrc} alt={media.poster_path} />
            </Link>
            <div className="secondDetailsSearchPage">
                <p className={`${styleText} sm:text-lg text-sm font-semibold`}>{title || name}</p>
                <p className={`${styleText} dateSingleMovie sm:text-sm text-sm`}>{airDate || releaseDate}</p>
                <p className={`${styleText} mt-4  lg:text-base text-xs`} >{overview}</p>
            </div>
        </div>
    );
};

export default MediaItem